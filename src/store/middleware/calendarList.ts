import { MiddlewareAPI, Dispatch } from 'redux';
import { State } from '../reducers';
import { CalendarListAction, calendarListActions } from '../actions/calendarList';

export const calendarListMiddleware = (store: MiddlewareAPI<Dispatch<CalendarListAction>, State>) => (
    next: Dispatch<CalendarListAction>,
) => (action: CalendarListAction) => {
    const result = next(action);

    switch (action.type) {
    case 'calendarList/setCalendarColor':
        localStorage.setItem('calendarColors', JSON.stringify(store.getState().calendarList.calendarColors));
        break;
    default:
        break;
    }

    return result;
};

export const initCalendarListMiddleware = (store: MiddlewareAPI<Dispatch<CalendarListAction>, State>) => {
    const calendarColors = JSON.parse(localStorage.getItem('calendarColors') || '{}');
    store.dispatch(calendarListActions.receiveCalendarColors(calendarColors));
};