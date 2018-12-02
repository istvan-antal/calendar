import { createAction, ActionsUnion } from '.';

export const appMenuActions = {
    open: () => createAction('appMenu/open'),
    close: () => createAction('appMenu/close'),
    toggle: () => createAction('appMenu/toggle'),
};

export type AppMenuAction = ActionsUnion<typeof appMenuActions>;