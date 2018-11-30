import * as React from 'react';
import { serverFormActions } from '../store/actions/serverForm';
import './ServerForm.scss';

export interface ServerFormProps {
    actions: {
        cancelServerForm: typeof serverFormActions.cancel;
        saveServerForm: typeof serverFormActions.save;
        setServer: typeof serverFormActions.setServer;
        setUsername: typeof serverFormActions.setUsername;
        setPassword: typeof serverFormActions.setPassword;
    };
}

export const ServerForm = (props: ServerFormProps) => (
    <div className="ServerForm">
        <form className="Form" onSubmit={e => { e.preventDefault(); props.actions.saveServerForm(); }}>
            <div className="FormRow">
                <label>
                    <span className="FormLabel">
                        Server
                    </span>
                    <input onChange={e => { props.actions.setServer(e.target.value); }} type="text" />
                </label>
            </div>
            <div className="FormRow">
                <label>
                    <span className="FormLabel">
                        Username
                    </span>
                    <input onChange={e => { props.actions.setUsername(e.target.value); }} type="email" />
                </label>
            </div>
            <div className="FormRow">
                <label>
                    <span className="FormLabel">
                        Password
                    </span>
                    <input onChange={e => { props.actions.setPassword(e.target.value); }} type="password" />
                </label>
            </div>
            <div className="FormButtonRow">
                <button onClick={props.actions.cancelServerForm} type="button">Cancel</button>
                <button type="submit">Save</button>
            </div>
        </form>
    </div>
);