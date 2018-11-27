import * as React from 'react';
import { DateTime } from 'luxon';
import './Calendar.scss';

interface Props {
}

interface State {
}

export default class Calendar extends React.Component<Props, State> {
    render() {
        const currentDate = DateTime.local();
        const currentMonth = currentDate.month;
        const viewStartDate = currentDate.startOf('month').startOf('week');
        const viewEndDate = currentDate.endOf('month').endOf('week');
        let iterator = viewStartDate;
        const weeks: DateTime[][] = [];
        let currentWeekList: DateTime[] = [];
        let currentWeekNumber = viewStartDate.weekNumber;
        while (iterator < viewEndDate) {
            if (currentWeekNumber !== iterator.weekNumber) {
                currentWeekNumber = iterator.weekNumber;
                weeks.push(currentWeekList);
                currentWeekList = [];
            }

            currentWeekList.push(iterator);

            iterator = iterator.plus({ days: 1 });
        }
        return (
            <>
                {weeks.map((week, index) => (
                    <div className="Row" key={index}>
                        {week.map(d => (
                            <div className="Column" key={d.toISODate()}>
                                {d.day}
                            </div>
                        ))}
                    </div>
                ))}
            </>
         );
    }
}