import * as React from 'react';
import { DateTime } from 'luxon';
import './Header.scss';
import { serverListActions } from '../store/actions/serverList';
import AppMenuComponent from '../components/AppMenuComponent';

interface HeaderProps {
    isServerListOpen?: boolean;
    toggleServerList: typeof serverListActions.toggle;
    currentTime: string;
}

export default (props: HeaderProps) => (
    <div className="Header">
        <div className="HeaderTitle">
            {DateTime.fromISO(props.currentTime).toFormat('LLLL')}
        </div>
        <AppMenuComponent />
    </div>
);