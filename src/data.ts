import { transport, Credentials, createAccount } from 'dav';
import { parseVcalendar, toEvent, Event } from './util/vcalendar';
import * as bodyParser from 'body-parser';

interface Calendar {
    displayName: string;
    events: Event[];
}

interface Account {
    calendars: Calendar[];
}

interface Response {
    accounts: Account[];
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
                    calendars: account.calendars.filter(cal => cal.components.includes('VEVENT')).map(cal => {
                        const calendar: Calendar = {
                            displayName: cal.displayName,
                            events: cal.objects.map(obj => {
                                const event = toEvent(parseVcalendar(obj.calendarData));
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