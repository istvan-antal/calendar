import { Server, ServerOptions } from 'ws';
import { ServerListActions } from '../store/actions/serverList';
import { CurrentViewAction } from '../store/actions/currentView';
import fetchAccount from './fetchAccount';
import { DateTime } from 'luxon';
import { Calendar, calendarListActions } from '../store/actions/calendarList';
import filterEvent from '../util/filterEvent';
import { eventsActions } from '../store/actions/events';
import { AnyAction } from 'redux';

export const create = (options: ServerOptions) => {
    const wss = new Server(options);

    wss.on('connection', ws => {
        console.log('New connection');
        let currentTimeString = '';
        // let currentTimezone = '';

        const sendAction = (action: AnyAction) => {
            ws.send(JSON.stringify(action));
        };

        ws.on('message', data => {
            const action: ServerListActions | CurrentViewAction = JSON.parse(data.toString());
            switch (action.type) {
                case 'currentView/receiveCurrentTime':
                currentTimeString = action.payload;
                break;
                /* case 'currentView/receiveDefaultTimezone':
                currentTimezone = action.payload;
                break; */
                case 'serverList/receiveServers':
                (async () => {
                    const servers = action.payload;
                    const accounts = await Promise.all(servers.map(fetchAccount));
                    const currentTime = DateTime.fromISO(currentTimeString);
                    const currentView = 'month';
                    const calendars = accounts
                        .reduce((a, b) => a.concat(b.calendars), [] as Calendar[]);
                    const events = calendars
                        .map(item => item.events)
                        .reduce((a, b) => a.concat(b), [])
                        .filter(event => filterEvent(event, currentTime, currentView));

                    sendAction(calendarListActions.receive(calendars));
                    sendAction(eventsActions.receive(events));
                })().catch(error => {
                    throw error;
                });
                break;
                default:
                break;
            }
        });

        ws.on('close', () => {
            console.log('Close');
        });
    });
};