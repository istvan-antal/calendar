import * as React from 'react';
import { DateTime } from 'luxon';
import './Calendar.scss';
import { Event } from '../vcalendar';

interface Props {
    currentTime: string;
    events: Event[];
}

export default (props: Props) => {
    const currentTime = DateTime.fromISO(props.currentTime);
    const currentMonth = currentTime.month;
    const viewStartDate = currentTime.startOf('month').startOf('week');
    const viewEndDate = currentTime.endOf('month').endOf('week');
    let iterator = viewStartDate;
    const weeks: Array<Array<{ time: DateTime; events: Event[] }>> = [];
    let currentWeekList: Array<{ time: DateTime; events: Event[] }> = [];
    let currentWeekNumber = viewStartDate.weekNumber;
    while (iterator < viewEndDate) {
        if (currentWeekNumber !== iterator.weekNumber) {
            currentWeekNumber = iterator.weekNumber;
            weeks.push(currentWeekList);
            currentWeekList = [];
        }

        currentWeekList.push({ time: iterator, events: [] });

        iterator = iterator.plus({ days: 1 });
    }
    return (
        <>
            {weeks.map((week, index) => (
                <div className="Row" key={index}>
                    {week.map(d => (
                        <div className="Column" key={d.time.toISODate()}>
                            {d.time.day}
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
};