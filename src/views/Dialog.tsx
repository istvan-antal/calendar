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

export default class Dialog extends React.Component<Props> {
    private onEscape!: (e: KeyboardEvent) => void;
    componentDidMount() {
        this.onEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                this.props.onClose();
            }
        };
        document.addEventListener('keydown', this.onEscape);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.onEscape);
    }
    render() {
        const props = this.props;
        return (
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
    }
}