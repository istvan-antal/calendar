import { createAction, ActionsUnion } from '.';

export const currentViewActions = {
    receiveCurrentTime: (currentTime: string) => createAction('currentView/receiveCurrentTime', currentTime),
    receiveDefaultTimezone: (timezone: string) => createAction('currentView/receiveDefaultTimezone', timezone),
};

export type CurrentViewAction = ActionsUnion<typeof currentViewActions>;