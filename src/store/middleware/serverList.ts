import { MiddlewareAPI, Dispatch } from 'redux';
import { State } from '../reducers';
import { ServerListActions, serverListActions, Server } from '../actions/serverList';
import filterEvent from '../../util/filterEvent';
import { DateTime } from 'luxon';
import { eventsActions, EventsAction } from '../actions/events';

interface CalendarDateTime {
    year: number;
    month: number;
    day: number;
    hour?: number;
    minute?: number;
    second?: number;
    timezone?: string;
}

interface Event {
    summary: string;
    description: string;
    start: CalendarDateTime;
    end: CalendarDateTime;
}

interface Calendar {
    displayName: string;
    events: Event[];
}

interface Account {
    calendars: Calendar[];
}

interface ResultSet {
    accounts: Account[];
}

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

export const serverListMiddleware = (store: MiddlewareAPI<Dispatch<ServerListActions | EventsAction>, State>) => (
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
                const events = accounts
                    .reduce((a, b) => a.concat(b.calendars), [] as Calendar[])
                    .map(item => item.events)
                    .reduce((a, b) => a.concat(b), [])
                    .filter(event => filterEvent(event, currentTime, currentView));
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