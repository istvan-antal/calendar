import * as React from 'react';
import { DateTime } from 'luxon';
import { Client, transport, Credentials, createAccount } from 'dav';
import './App.scss';

export default class App extends React.Component {
    /* constructor() {
        super({});
        fetch('/data', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: '',
                password: '',
                server: '',
            }),
        }).then(response => response.json()).then(data => {
            console.log(data);
        });
    }*/
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
            console.log(iterator.weekNumber);

            if (currentWeekNumber !== iterator.weekNumber) {
                currentWeekNumber = iterator.weekNumber;
                weeks.push(currentWeekList);
                currentWeekList = [];
            }

            currentWeekList.push(iterator);

            iterator = iterator.plus({ days: 1 });
        }
        return (
            <div className="Calendar">
                {weeks.map((week, index) => (
                    <div className="Row" key={index}>
                        {week.map(d => (
                            <div className="Column" key={d.toISODate()}>
                                {d.day}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}