import { createAction, ActionsUnion } from '.';
import { Event } from '../../util/vcalendar';

export interface Calendar {
    url: string;
    displayName: string;
    events: Event[];
}

export const calendarListActions = {
    open: () => createAction('calendarList/open'),
    close: () => createAction('calendarList/close'),
    receive: (calendars: Calendar[]) => createAction('calendarList/receive', calendars),
    receiveCalendarColors: (colors: {
        [key: string]: string;
    }) => createAction('calendarList/receiveCalendarColors', colors),
    setCalendarColor: ({ calendar, color }: { calendar: Calendar; color: string }) => createAction(
        'calendarList/setCalendarColor',
        { calendar, color },
    ),
};

export type CalendarListAction = ActionsUnion<typeof calendarListActions>;