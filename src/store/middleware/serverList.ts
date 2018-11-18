import { MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import { State } from '../../reducers';
import { ServerListActions } from '../../actions/serverList';

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
