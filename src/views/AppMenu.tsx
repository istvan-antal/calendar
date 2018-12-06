import * as React from 'react';
import './AppMenu.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import FocusView from './FocusView';

library.add(faBars);

interface Props {
    isAppMenuOpen: boolean;
    toggleAppMenu(): void;
    closeAppMenu(): void;
    openServerList(): void;
    openCalendarList(): void;
    closeCalendarList(): void;
}

interface AppMenuDropDownProps {
    openServerList(): void;
    closeAppMenu(): void;
    openCalendarList(): void;
    closeCalendarList(): void;
}

const AppMenuDropDown = (props: AppMenuDropDownProps) => (
    <div className="AppMenuDropDown">
        <a className="AppMenuDropDownItem" onClick={() => {
            props.openCalendarList();
            props.closeAppMenu();
        }}>
            Calendars
        </a>
        <a className="AppMenuDropDownItem" onClick={() => {
            props.openServerList();
            props.closeAppMenu();
        }}>
            Servers
        </a>
    </div>
);

export default (props: Props) => (
    <FocusView
    className="AppMenu"
        onFocusLost={() => {
            if (props.isAppMenuOpen) {
                props.closeAppMenu();
            }
        }}
    >
        <button onClick={props.toggleAppMenu}>
            <FontAwesomeIcon icon="bars" />
        </button>
        {props.isAppMenuOpen && <AppMenuDropDown
            openServerList={props.openServerList}
            closeCalendarList={props.openCalendarList}
            closeAppMenu={props.closeAppMenu}
            openCalendarList={props.openCalendarList}
        />}
    </FocusView>
);