import { createAction, ActionsUnion } from '.';
import { Event } from '../../vcalendar';

export const eventsActions = {
    receive: (events: Event[]) => createAction('events/receive', events),
};

export type EventsAction = ActionsUnion<typeof eventsActions>;