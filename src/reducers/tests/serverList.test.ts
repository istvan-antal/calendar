import { serverList } from '../serverList';
import { serverListActions } from '../../actions/serverList';

test('serverList', () => {
    // tslint:disable-next-line:no-any
    expect(serverList(undefined, { type: '' } as any)).toMatchSnapshot();
    expect(serverList(undefined, serverListActions.receiveServers([]))).toMatchSnapshot();
    expect(serverList([], serverListActions.receiveServers([]))).toMatchSnapshot();
});