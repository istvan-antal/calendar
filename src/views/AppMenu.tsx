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
}

interface AppMenuDropDownProps {
    openServerList(): void;
    closeAppMenu(): void;
}

const AppMenuDropDown = (props: AppMenuDropDownProps) => (
    <div className="AppMenuDropDown">
        <a className="AppMenuDropDownItem" onClick={() => {
            props.openServerList();
            props.closeAppMenu();
        }}>Servers</a>
    </div>
);

export default (props: Props) => (
    <FocusView onFocusLost={props.closeAppMenu} className="AppMenu">
        <button onClick={props.toggleAppMenu}>
            <FontAwesomeIcon icon="bars" />
        </button>
        {props.isAppMenuOpen && <AppMenuDropDown
            openServerList={props.openServerList}
            closeAppMenu={props.closeAppMenu}
        />}
    </FocusView>
);