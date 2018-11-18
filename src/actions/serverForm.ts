import { createAction, ActionsUnion } from '.';

export const serverFormActions = {
    openServerForm: () => createAction('openServerForm'),
    cancelServerForm: () => createAction('cancelServerForm'),
};

export type ServerFormActions = ActionsUnion<typeof serverFormActions>;