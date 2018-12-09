import * as React from 'react';
import { DateTime } from 'luxon';
import './Calendar.scss';
import { Event } from '../util/vcalendar';
import filterEvent from '../util/filterEvent';
import { State } from '../store/reducers';

export interface CalendarViewEvent extends Event {
    isIntermediate: boolean;
    includesEnd: boolean;
}

interface Props {
    currentTime: string;
    events: Event[];
    calendarColors: State['calendarList']['calendarColors'];
}

const evenTimeToDateTime = (eventTime: { year: number; month: number; day: number }) => (
    DateTime.local(eventTime.year, eventTime.month, eventTime.day)
);

const isIntermediate = (event: Event, startTime: DateTime, endTime: DateTime) => (
    startTime > evenTimeToDateTime(event.start) && endTime < evenTimeToDateTime(event.end)
);

const includesEnd = (event: Event, endTime: DateTime) => (
    evenTimeToDateTime(event.end) <= endTime
);

export default (props: Props) => {
    const currentTime = DateTime.fromISO(props.currentTime);
    const currentTimeStartOfDay = currentTime.startOf('day');
    const currentTimeEndOfDay = currentTime.endOf('day');
    const viewStartDate = currentTime.startOf('month').startOf('week');
    const viewEndDate = currentTime.endOf('month').endOf('week');
    let iterator = viewStartDate;
    const weeks: Array<Array<{ time: DateTime; events: CalendarViewEvent[]; isCurrentDay: boolean }>> = [];
    let currentWeekList: Array<{ time: DateTime; events: CalendarViewEvent[]; isCurrentDay: boolean }> = [];
    let currentWeekNumber = viewStartDate.weekNumber;
    while (iterator < viewEndDate) {
        if (currentWeekNumber !== iterator.weekNumber) {
            currentWeekNumber = iterator.weekNumber;
            weeks.push(currentWeekList);
            currentWeekList = [];
        }

        currentWeekList.push({
            time: iterator,
            isCurrentDay: currentTimeStartOfDay <= iterator && iterator <= currentTimeEndOfDay,
            events: props.events.filter(event => filterEvent(event, iterator, 'day')).map(event => ({
                ...event,
                isIntermediate: isIntermediate(event, iterator.startOf('day'), iterator.endOf('day')),
                includesEnd: includesEnd(event, iterator.endOf('day')),
            })).sort((a, b) => evenTimeToDateTime(a.start).toMillis() - evenTimeToDateTime(b.start).toMillis()),
        });

        iterator = iterator.plus({ days: 1 });
    }
    return (
        <div className="CalendarRows">
            {weeks.map((week, index) => (
                <div className="Row" key={index}>
                    {week.map(d => (
                        <div
                            className={`Column${d.isCurrentDay ? ' current' : ''}`}
                            key={d.time.toISODate()}
                        >
                            <div className="TimeLabel">
                                {d.time.day}
                            </div>
                            {d.events.map((event, key) => (
                                <div
                                    className={`Event${event.includesEnd ? ' includesEnd' : ''}`}
                                    style={{ backgroundColor: props.calendarColors[event.calendarUrl] }} key={key}>
                                    {event.isIntermediate ? <>&nbsp;</> : event.summary}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};