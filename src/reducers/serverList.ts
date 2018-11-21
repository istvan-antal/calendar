import { ServerListActions, Server } from '../actions/serverList';

interface ServerListState {
    isOpen?: boolean;
    servers: Server[];
}

export const serverList = (state: ServerListState = { servers: [] }, action: ServerListActions) => {
    switch (action.type) {
    case 'serverList/receiveServers':
        return {
            ...state,
            servers: action.payload,
        };
    case 'serverList/open':
        return {
            ...state,
            isOpen: true,
        };
    case 'serverList/close':
        return {
            ...state,
            isOpen: undefined,
        };
    case 'serverList/toggle':
        return {
            ...state,
            isOpen: !state.isOpen,
        };
    default:
        return state;
    }
};
