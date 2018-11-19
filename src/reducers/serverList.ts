import { ServerListActions, Server } from '../actions/serverList';

export const serverList = (state: Server[] = [], action: ServerListActions) => {
    switch (action.type) {
    case 'serverList/receiveServers':
        return action.payload;
    default:
        return state;
    }
};
