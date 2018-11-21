import * as React from 'react';
import { DateTime } from 'luxon';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Header.scss';
import ServerListComponent from '../components/ServerListComponent';
import { serverListActions } from '../actions/serverList';

library.add(faBars);

interface HeaderProps {
    isServerListOpen?: boolean;
    toggleServerList: typeof serverListActions.toggle;
    currentDate: DateTime;
}

export default (props: HeaderProps) => (
    <div className="Header">
        <div className="HeaderTitle">
            {props.currentDate.toFormat('LLLL')}
        </div>
        <div className="HeaderMenu">
            <button onClick={props.toggleServerList}>
                <FontAwesomeIcon icon="bars" />
            </button>
            {props.isServerListOpen && <ServerListComponent />}
        </div>
    </div>
);