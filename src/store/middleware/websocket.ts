import { MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import { State } from '../reducers';

let isOpen = false;
const ws = new WebSocket(`ws://${location.hostname}:3001/ws`);
ws.onopen = () => {
    console.log('open');
    isOpen = true;
};
ws.onmessage = m => {
    console.log(m);
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
    }
    const result = next(action);
    return result;
};

// tslint:disable-next-line:variable-name
export const initServerWebsocketMiddleware = (_store: MiddlewareAPI<Dispatch<AnyAction>, State>) => {
    //
};