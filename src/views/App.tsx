import * as React from 'react';
import { DateTime } from 'luxon';
import './App.scss';
import Header from './Header';
import { serverListActions } from '../actions/serverList';
import Calendar from './Calendar';

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
            <Calendar currentTime={props.currentTime} />
        </div>
    </div>
);