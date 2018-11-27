import * as React from 'react';
import { DateTime } from 'luxon';
import './App.scss';
import Header from './Header';
import { serverListActions } from '../actions/serverList';
import Calendar from './Calendar';

interface Props {
    // currentTime: DateTime;
    isServerListOpen?: boolean;
    toggleServerList: typeof serverListActions.toggle;
}

export default class App extends React.Component<Props> {
    render() {
        const currentTime = DateTime.local();
        return (
            <div className="App">
                <div className="Calendar">
                    <Header
                        currentTime={currentTime}
                        isServerListOpen={this.props.isServerListOpen}
                        toggleServerList={this.props.toggleServerList}
                    />
                    <Calendar currentTime={currentTime} />
                </div>
            </div>
        );
    }
}