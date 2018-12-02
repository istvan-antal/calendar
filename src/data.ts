import { transport, Credentials, createAccount } from 'dav';
import { parseVcalendar, toEvent } from './util/vcalendar';
import * as bodyParser from 'body-parser';
import { Calendar } from './store/actions/calendarList';

interface Account {
    url: string;
    calendars: Calendar[];
}

// tslint:disable-next-line:no-any
export default (app: any) => {
    app.use(bodyParser.json());
    // tslint:disable-next-line:no-any
    app.post('/data', (request: any, response: any) => {
        const xhr = new transport.Basic(
            new Credentials({
                username: request.body.username,
                password: request.body.password,
            }),
        );

        createAccount({
            server: request.body.server,
            xhr,
            loadObjects: true,
        })
            .then(account => {
                const accountResponse: Account = {
                    url: account.principalUrl,
                    calendars: account.calendars.filter(cal => cal.components.includes('VEVENT')).map(cal => {
                        const calendar: Calendar = {
                            url: cal.url,
                            displayName: cal.displayName,
                            events: cal.objects.map(obj => {
                                const event = toEvent(parseVcalendar(obj.calendarData));
                                event.calendarUrl = cal.url;
                                return event;
                            }),
                        };
                        return calendar;
                    }),
                };
                response.json({
                    accounts: [accountResponse],
                });
            }).catch(error => {
                console.error(error);
            });
    });
};