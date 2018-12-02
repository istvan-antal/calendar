import { CalendarListAction, Calendar } from '../actions/calendarList';

interface State {
    isOpen: boolean;
    calendars: Calendar[];
    calendarColors: {
        [key: string]: string;
    };
}

const defaultState: State = {
    isOpen: false,
    calendars: [],
    calendarColors: {},
};

export const calendarList = (state = defaultState, action: CalendarListAction) => {
    switch (action.type) {
    case 'calendarList/open':
        return {
            ...state,
            isOpen: true,
        };
    case 'calendarList/close':
        return {
            ...state,
            isOpen: false,
        };
    case 'calendarList/receive':
        return {
            ...state,
            calendars: action.payload,
        };
    case 'calendarList/receiveCalendarColors':
        return {
            ...state,
            calendarColors: action.payload,
        };
    case 'calendarList/setCalendarColor':
        return {
            ...state,
            calendarColors: {
                ...state.calendarColors,
                [action.payload.calendar.url]: action.payload.color,
            },
        };
    default:
        return state;
    }
};