import * as React from 'react';
import './Dialog.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faTimes);

interface Props {
    title: string;
    children: JSX.Element | string | Array<JSX.Element | string | boolean | undefined>;
    className?: string;
    onClose(): void;
}

export default (props: Props) => (
    <div className={`Dialog${props.className ? ` ${props.className}` : ''}`}>
        <div className="DialogHeader">
            <div className="DialogHeaderTitle">
                {props.title}
            </div>
            <a className="DialogHeaderCloseIcon" onClick={props.onClose}>
                <FontAwesomeIcon icon="times" />
            </a>
        </div>
        {props.children}
    </div>
 );