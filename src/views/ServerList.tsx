import * as React from 'react';
import './ServerList.scss';
import { Server } from '../store/actions/serverList';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ServerFormComponent from '../components/ServerFormComponent';
import { serverFormActions } from '../store/actions/serverForm';

library.add(faPlus);

interface Props {
    servers: Server[];
    isServerFormOpen?: boolean;
    openServerForm: typeof serverFormActions.open;
}

export default (props: Props) => (
    <div className="ServerList">
        {props.isServerFormOpen && <ServerFormComponent />}
        <table>
            <tbody>
                {props.servers.map(server => (
                    <tr>
                        <td>
                            {server.server}
                        </td>
                        <td>
                            {server.username}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button onClick={props.openServerForm}>
            <FontAwesomeIcon icon="plus" />
        </button>
    </div>
);