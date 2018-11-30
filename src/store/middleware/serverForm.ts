import { MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import { State } from '../reducers';
import { ServerFormActions, serverFormActions } from '../actions/serverForm';
import { serverListActions } from '../actions/serverList';

export const serverFormMiddleware = (store: MiddlewareAPI<Dispatch<ServerFormActions | AnyAction>, State>) => (
    next: Dispatch<ServerFormActions>,
) => (action: ServerFormActions) => {
    const result = next(action);
    const serverList = store.getState().serverList;
    const form = store.getState().serverForm;

    switch (action.type) {
        case 'serverForm/save':
            const newServerList = [...serverList.servers, {
                ...form,
                isOpen: undefined,
            }];
            localStorage.setItem('serverList', JSON.stringify(newServerList));
            setTimeout(() => {
                store.dispatch(serverListActions.receiveServers(newServerList));
            }, 0);
            break;
        default:
            break;
    }

    return result;
};