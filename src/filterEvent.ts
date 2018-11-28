import { Event } from './vcalendar';
import { DateTime } from 'luxon';

export default (event: Event, referenceTime: DateTime, view: 'month') => {
    switch (view) {
    case 'month':
        return true;
    default:
        throw new Error('Unsupported view');
    }
};