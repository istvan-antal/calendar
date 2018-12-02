import * as React from 'react';

interface Props {
    className?: string;
    children: JSX.Element | string | Array<JSX.Element | string | boolean>;
    onFocusLost(): void;
}

export default class FocusView extends React.Component<Props> {
    private isLocalClick = false;
    private onLocalClick: () => void;
    private onGlobalClick: () => void;
    constructor(props: Props) {
        super(props);
        this.onLocalClick = () => {
            this.isLocalClick = true;
        };
        this.onGlobalClick = () => {
            if (!this.isLocalClick) {
                this.props.onFocusLost();
            }
            this.isLocalClick = false;
        };
    }
    componentDidMount() {
        document.addEventListener('click', this.onGlobalClick);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.onGlobalClick);
    }
    render() {
        return (
            <div
                onClick={this.onLocalClick}
                className={`FocusView${this.props.className ? ` ${this.props.className}` : ''}`}
            >
                {this.props.children}
            </div>
         );
    }
}