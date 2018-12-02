import * as React from 'react';
import Dialog from './Dialog';
import { State } from '../store/reducers';
import './CalendarList.scss';
import { calendarListActions } from '../store/actions/calendarList';

interface Props {
    calendars: State['calendarList']['calendars'];
    calendarColors: State['calendarList']['calendarColors'];
    setCalendarColor: typeof calendarListActions.setCalendarColor;
    close(): void;
}

export default (props: Props) => (
    <Dialog className="CalendarList" title="Calendars" onClose={props.close}>
        <table>
            <tbody>
                {props.calendars.map(calendar => (
                    <tr key={calendar.url}>
                        <td>
                            <input
                                onChange={e => {
                                    props.setCalendarColor({
                                        calendar, color: e.target.value,
                                    });
                                }}
                                value={props.calendarColors[calendar.url] || ''}
                                style={{
                                    backgroundColor: props.calendarColors[calendar.url],
                                }}
                                className="CalendarListColorInput"
                            />
                        </td>
                        <td>
                            {calendar.displayName}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </Dialog>
);