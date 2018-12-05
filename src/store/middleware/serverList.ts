import { MiddlewareAPI, Dispatch } from 'redux';
import { State } from '../reducers';
import { ServerListActions, serverListActions } from '../actions/serverList';

export const initServerListMiddleware = (store: MiddlewareAPI<Dispatch<ServerListActions>, State>) => {
    setTimeout(() => {
        const serverList = JSON.parse(localStorage.getItem('serverList') || '[]');
        store.dispatch(serverListActions.receiveServers(serverList));
    }, 0);
};