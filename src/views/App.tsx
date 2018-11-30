import * as React from 'react';
import './App.scss';
import Header from './Header';
import { serverListActions } from '../store/actions/serverList';
import CalendarComponent from '../components/CalendarComponent';

interface Props {
    currentTime: string;
    isServerListOpen?: boolean;
    toggleServerList: typeof serverListActions.toggle;
}

export default (props: Props) => (
    <div className="App">
        <div className="Calendar">
            <Header
                currentTime={props.currentTime}
                isServerListOpen={props.isServerListOpen}
                toggleServerList={props.toggleServerList}
            />
            <CalendarComponent />
        </div>
    </div>
);