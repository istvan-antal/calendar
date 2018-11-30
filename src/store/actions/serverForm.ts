import { createAction, ActionsUnion } from '.';

export const serverFormActions = {
    setServer: (server: string) => createAction('serverForm/setServer', server),
    setUsername: (username: string) => createAction('serverForm/setUsername', username),
    setPassword: (password: string) => createAction('serverForm/setPassword', password),
    open: () => createAction('serverForm/open'),
    save: () => createAction('serverForm/save'),
    cancel: () => createAction('serverForm/cancel'),
};

export type ServerFormActions = ActionsUnion<typeof serverFormActions>;