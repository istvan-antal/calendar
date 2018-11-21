import { createAction, ActionsUnion } from '.';

export interface Server {
    username: string;
    password: string;
    server: string;
}

export const serverListActions = {
    receiveServers: (servers: Server[]) => createAction('serverList/receiveServers', servers),
    open: () => createAction('serverList/open'),
    close: () => createAction('serverList/close'),
    toggle: () => createAction('serverList/toggle'),
};

export type ServerListActions = ActionsUnion<typeof serverListActions>;