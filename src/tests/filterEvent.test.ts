import filterEvent from '../filterEvent';
import { DateTime } from 'luxon';

test('filterEvent', () => {
    const currentTime = DateTime.fromISO('2018-11-28T07:39:27.923+00:00');
    expect(filterEvent(
        {
            summary: 'Event summary',
            description: 'Description',
            start: { year:2018, month:7, day: 11 },
            end: { year:2018, month:7, day: 15 },
        },
        currentTime,
        'month',
    )).toBe(true);
});