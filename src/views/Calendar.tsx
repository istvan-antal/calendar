import * as React from 'react';
import { DateTime } from 'luxon';
import './Calendar.scss';
import { Event } from '../util/vcalendar';
import filterEvent from '../util/filterEvent';
import { State } from '../store/reducers';

interface Props {
    currentTime: string;
    events: Event[];
    calendarColors: State['calendarList']['calendarColors'];
}

export default (props: Props) => {
    const currentTime = DateTime.fromISO(props.currentTime);
    const currentTimeStartOfDay = currentTime.startOf('day');
    const currentTimeEndOfDay = currentTime.endOf('day');
    const viewStartDate = currentTime.startOf('month').startOf('week');
    const viewEndDate = currentTime.endOf('month').endOf('week');
    let iterator = viewStartDate;
    const weeks: Array<Array<{ time: DateTime; events: Event[]; isCurrentDay: boolean }>> = [];
    let currentWeekList: Array<{ time: DateTime; events: Event[]; isCurrentDay: boolean }> = [];
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
            events: props.events.filter(event => filterEvent(event, iterator, 'day')),
        });

        iterator = iterator.plus({ days: 1 });
    }
    return (
        <>
            {weeks.map((week, index) => (
                <div className="Row" key={index}>
                    {week.map(d => (
                        <div className={`Column${d.isCurrentDay ? ' current' : ''}`} key={d.time.toISODate()}>
                            <div className="TimeLabel">
                                {d.time.day}
                            </div>
                            {d.events.map((event, key) => (
                                <div
                                    className="Event"
                                    style={{ backgroundColor: props.calendarColors[event.calendarUrl] }} key={key}>
                                    {event.summary}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
};