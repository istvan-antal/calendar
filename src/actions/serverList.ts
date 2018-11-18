import { createAction, ActionsUnion } from '.';

interface Server {
    username: string;
    password: string;
    server: string;
}

export const serverListActions = {
    receiveServers: (servers: Server[]) => createAction('receiveServers', servers),
};

export type ServerListActions = ActionsUnion<typeof serverListActions>;