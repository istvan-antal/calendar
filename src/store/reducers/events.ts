import { EventsAction } from '../actions/events';
import { Event } from '../../vcalendar';

type State = Event[];
const defaultState: State = [];

export const events = (state = defaultState, action: EventsAction) => {
    switch (action.type) {
    case 'events/receive':
        return action.payload;
    default:
        return state;
    }
};