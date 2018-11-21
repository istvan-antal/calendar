import * as React from 'react';
import { DateTime } from 'luxon';
import './App.scss';
import Header from './Header';
import { serverListActions } from '../actions/serverList';

interface Props {
    isServerListOpen?: boolean;
    toggleServerList: typeof serverListActions.toggle;
}

export default class App extends React.Component<Props> {
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
            <div className="App">
                <div className="Calendar">
                    <Header
                        currentDate={currentDate}
                        isServerListOpen={this.props.isServerListOpen}
                        toggleServerList={this.props.toggleServerList}
                    />
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
            </div>
        );
    }
}