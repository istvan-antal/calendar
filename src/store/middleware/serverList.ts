import { MiddlewareAPI, Dispatch } from 'redux';
import { State } from '../reducers';
import { ServerListActions, serverListActions, Server } from '../actions/serverList';
import filterEvent from '../../util/filterEvent';
import { DateTime } from 'luxon';
import { eventsActions, EventsAction } from '../actions/events';
import { Calendar, calendarListActions, CalendarListAction } from '../actions/calendarList';

interface Account {
    calendars: Calendar[];
}

interface ResultSet {
    accounts: Account[];
}

/*
console.log(`Connecting to ${location.origin.replace('http://', 'ws://')}/ws`);
const ws = new WebSocket(`${location.origin.replace('http://', 'ws://')}/ws`);
ws.onopen = () => {
    console.log('open');
};
ws.onmessage = m => {
    console.log(m);
};
ws.onclose = () => {
    // websocket is closed.
    console.log('Connection is closed...');
};*/

const fetchAccounts = async (server: Server): Promise<ResultSet> => fetch('/data', {
    method: 'post',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username: server.username,
        password: server.password,
        server: server.server,
    }),
}).then(async response => response.json());

export const initServerListMiddleware = (store: MiddlewareAPI<Dispatch<ServerListActions>, State>) => {
    setTimeout(() => {
        const serverList = JSON.parse(localStorage.getItem('serverList') || '[]');
        store.dispatch(serverListActions.receiveServers(serverList));
    }, 0);
};

export const serverListMiddleware = (
    store: MiddlewareAPI<Dispatch<ServerListActions | CalendarListAction | EventsAction>, State>,
) => (
    next: Dispatch<ServerListActions>,
) => (action: ServerListActions) => {
    const result = next(action);

    switch (action.type) {
        case 'serverList/receiveServers':
        const serversList = store.getState().serverList;
        serversList.servers.forEach(server => {
            (async () => {
                const currentTime = DateTime.fromISO(store.getState().currentView.currentTime);
                const currentView = 'month';
                const { accounts } = await fetchAccounts(server);
                const calendars = accounts
                    .reduce((a, b) => a.concat(b.calendars), [] as Calendar[]);
                const events = calendars
                    .map(item => item.events)
                    .reduce((a, b) => a.concat(b), [])
                    .filter(event => filterEvent(event, currentTime, currentView));
                store.dispatch(calendarListActions.receive(calendars));
                store.dispatch(eventsActions.receive(events));
            })().catch(error => {
                throw error;
            });
        });
        break;
    default:
        break;
    }

    return result;
};