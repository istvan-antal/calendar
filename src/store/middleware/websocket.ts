import { MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import { State } from '../reducers';

let isOpen = false;
let currentStore: MiddlewareAPI<Dispatch<AnyAction>, State>;
const actionsBuffer: AnyAction[] = [];

const ws = new WebSocket(`ws://${location.hostname}:3001/ws`);

ws.onopen = () => {
    console.log('open');
    isOpen = true;
    actionsBuffer.forEach(action => {
        ws.send(JSON.stringify(action));
    });
};
ws.onmessage = event => {
    currentStore.dispatch(JSON.parse(event.data));
};
ws.onclose = () => {
    // websocket is closed.
    console.log('Connection is closed...');
};

// tslint:disable-next-line:variable-name
export const websocketMiddleware = (_store: MiddlewareAPI<Dispatch, State>) => (
    next: Dispatch,
) => (action: AnyAction) => {
    if (isOpen) {
        ws.send(JSON.stringify(action));
    } else {
        actionsBuffer.push(action);
    }
    const result = next(action);
    return result;
};

// tslint:disable-next-line:variable-name
export const initServerWebsocketMiddleware = (store: MiddlewareAPI<Dispatch<AnyAction>, State>) => {
    currentStore = store;
};