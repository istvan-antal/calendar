import * as React from 'react';
import { DateTime } from 'luxon';
import './App.scss';
import Header from './Header';
import { serverListActions } from '../actions/serverList';
import Calendar from './Calendar';

interface Props {
    isServerListOpen?: boolean;
    toggleServerList: typeof serverListActions.toggle;
}

export default class App extends React.Component<Props> {
    render() {
        const currentDate = DateTime.local();
        return (
            <div className="App">
                <div className="Calendar">
                    <Header
                        currentDate={currentDate}
                        isServerListOpen={this.props.isServerListOpen}
                        toggleServerList={this.props.toggleServerList}
                    />
                    <Calendar />
                </div>
            </div>
        );
    }
}