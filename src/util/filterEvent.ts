import { Event } from './vcalendar';
import { DateTime } from 'luxon';

const filterByRange = (event: Event, startTime: DateTime, endTime: DateTime) => {
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
    return (eventStartTime >= startTime && eventStartTime <= endTime) ||
        (eventEndTime <= endTime && eventEndTime >= startTime);
};

export default (event: Event, referenceTime: DateTime, view: 'month' | 'day') => {
    switch (view) {
    case 'month':
        return filterByRange(
            event,
            referenceTime.startOf('month').startOf('day'),
            referenceTime.endOf('month').endOf('day'),
        );
    case 'day':
        return filterByRange(
            event,
            referenceTime.startOf('day'),
            referenceTime.endOf('day'),
        );
    default:
        throw new Error('Unsupported view');
    }
};