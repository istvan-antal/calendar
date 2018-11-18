import { MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import { State } from '../../reducers';
import { ServerListActions, serverListActions } from '../../actions/serverList';

export const serverListMiddleware = (store: MiddlewareAPI<Dispatch<ServerListActions | AnyAction>, State>) => (
    next: Dispatch<ServerListActions>,
) => (action: ServerListActions) => {
    const result = next(action);

    switch (action.type) {
        default:
            break;
    }

    return result;
};

export const initServerListMiddleware = (store: MiddlewareAPI<Dispatch<ServerListActions | AnyAction>, State>) => {
    const serverList = JSON.parse(localStorage.getItem('serverList') || '[]');
    store.dispatch(serverListActions.receiveServers(serverList));
};