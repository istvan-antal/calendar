import { createAction, ActionsUnion } from '.';

export const currentViewActions = {
    receiveCurrentTime: (currentTime: string) => createAction('currentView/receiveCurrentTime', currentTime),
};

export type CurrentViewAction = ActionsUnion<typeof currentViewActions>;