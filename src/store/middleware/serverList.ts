import { MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import { State } from '../../reducers';
import { ServerListActions, serverListActions } from '../../actions/serverList';

export const serverListMiddleware = (store: MiddlewareAPI<Dispatch<ServerListActions | AnyAction>, State>) => (
    next: Dispatch<ServerListActions>,
) => (action: ServerListActions) => {
    const result = next(action);

    switch (action.type) {
        case 'serverList/receiveServers':
        const serversList = store.getState().serverList;
        serversList.servers.forEach(server => {
            fetch('/data', {
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
            }).then(response => response.json()).then(data => {
                console.log(data);
            });
        });
        break;
    default:
        break;
    }

    return result;
};

export const initServerListMiddleware = (store: MiddlewareAPI<Dispatch<ServerListActions | AnyAction>, State>) => {
    const serverList = JSON.parse(localStorage.getItem('serverList') || '[]');
    store.dispatch(serverListActions.receiveServers(serverList));
};