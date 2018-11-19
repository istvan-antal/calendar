import { createAction, ActionsUnion } from '.';

export interface Server {
    username: string;
    password: string;
    server: string;
}

export const serverListActions = {
    receiveServers: (servers: Server[]) => createAction('serverList/receiveServers', servers),
};

export type ServerListActions = ActionsUnion<typeof serverListActions>;