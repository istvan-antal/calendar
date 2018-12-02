import * as React from 'react';
import './ServerList.scss';
import { Server } from '../store/actions/serverList';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import ServerFormComponent from '../components/ServerFormComponent';

library.add(faPlus);
library.add(faTimes);

interface Props {
    servers: Server[];
    isServerFormOpen?: boolean;
    openServerForm(): void;
    close(): void;
}

export default (props: Props) => (
    <div className="ServerList">
        <a onClick={props.close}>
            <FontAwesomeIcon icon="times" />
        </a>
        {props.isServerFormOpen && <ServerFormComponent />}
        <table>
            <tbody>
                {props.servers.map((server, index) => (
                    <tr key={index}>
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