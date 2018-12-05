import { transport, Credentials, createAccount } from 'dav';
import { parseVcalendar, toEvent } from '../util/vcalendar';
import { Calendar } from '../store/actions/calendarList';
import { Server } from '../store/actions/serverList';

interface Account {
    url: string;
    calendars: Calendar[];
}

export default async (server: Server) => {
    const xhr = new transport.Basic(
        new Credentials({
            username: server.username,
            password: server.password,
        }),
    );

    const account = await createAccount({
        server: server.server,
        xhr,
        loadObjects: true,
    });

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

    return accountResponse;
};