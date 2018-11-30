import { createAction, ActionsUnion } from '.';
import { Event } from '../../util/vcalendar';

export const eventsActions = {
    receive: (events: Event[]) => createAction('events/receive', events),
};

export type EventsAction = ActionsUnion<typeof eventsActions>;