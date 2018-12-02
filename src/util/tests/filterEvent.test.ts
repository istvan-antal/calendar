import filterEvent from '../filterEvent';
import { DateTime } from 'luxon';

test('filterEvent on day', () => {
    const currentTime = DateTime.fromISO('2018-11-11T07:39:27.923+00:00');
    expect(filterEvent(
        {
            calendarUrl: '',
            summary: 'Event summary',
            description: 'Description',
            start: { year:2018, month: 7, day: 11 },
            end: { year:2018, month: 7, day: 15 },
        },
        currentTime,
        'day',
    )).toBe(false);

    expect(filterEvent(
        {
            calendarUrl: '',
            summary: 'Event summary',
            description: 'Description',
            start: { year:2018, month: 11, day: 11 },
            end: { year:2018, month: 11, day: 15 },
        },
        currentTime,
        'day',
    )).toBe(true);
});

test('filterEvent on month', () => {
    const currentTime = DateTime.fromISO('2018-11-28T07:39:27.923+00:00');
    expect(filterEvent(
        {
            calendarUrl: '',
            summary: 'Event summary',
            description: 'Description',
            start: { year:2018, month: 7, day: 11 },
            end: { year:2018, month: 7, day: 15 },
        },
        currentTime,
        'month',
    )).toBe(false);

    expect(filterEvent(
        {
            calendarUrl: '',
            summary: 'Event summary',
            description: 'Description',
            start: { year:2018, month: 11, day: 11 },
            end: { year:2018, month: 11, day: 15 },
        },
        currentTime,
        'month',
    )).toBe(true);
});

test('filterEvent invalid input', () => {
    const currentTime = DateTime.fromISO('2018-11-28T07:39:27.923+00:00');
    expect(() => {
        filterEvent(
            {
                calendarUrl: '',
                summary: 'Event summary',
                description: 'Description',
                start: { year:2018, month: 7, day: 11 },
                end: { year:2018, month: 7, day: 15 },
            },
            currentTime,
            // tslint:disable-next-line:no-any
            'invalid' as any,
        );
    }).toThrow();
});