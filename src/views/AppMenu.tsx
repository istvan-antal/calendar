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
        <ul>
            <li>
                <a className="AppMenuDropDownItem" onClick={() => {
                    props.openCalendarList();
                    props.closeAppMenu();
                }}>
                    Calendars
                </a>
            </li>
            <li>
                <a className="AppMenuDropDownItem" onClick={() => {
                    props.openServerList();
                    props.closeAppMenu();
                }}>
                    Servers
                </a>
            </li>
        </ul>
    </div>
);

export default (props: Props) => (
    <FocusView onFocusLost={props.closeAppMenu} className="AppMenu">
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