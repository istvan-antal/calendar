import * as React from 'react';
import { Server } from '../store/actions/serverList';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ServerFormComponent from '../components/ServerFormComponent';
import Dialog from './Dialog';

library.add(faPlus);

interface Props {
    servers: Server[];
    isServerFormOpen?: boolean;
    openServerForm(): void;
    close(): void;
}

export default (props: Props) => (
    <Dialog title="Servers" onClose={props.close}>
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
    </Dialog>
);