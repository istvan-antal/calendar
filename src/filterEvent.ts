import { Event } from './vcalendar';
import { DateTime } from 'luxon';

export default (event: Event, referenceTime: DateTime, view: 'month') => {
    switch (view) {
    case 'month':
        const startTime = referenceTime.startOf('month').startOf('day');
        const endTime = referenceTime.endOf('month').endOf('day');
        const eventStartTime = startTime.set({
            year: event.start.year,
            month: event.start.month,
            day: event.start.day,
        });
        const eventEndTime = startTime.set({
            year: event.end.year,
            month: event.end.month,
            day: event.end.day,
        });
        return (eventStartTime > startTime && eventStartTime < endTime) ||
            (eventEndTime < endTime && eventEndTime > startTime);
    default:
        throw new Error('Unsupported view');
    }
};