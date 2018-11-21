import * as React from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import store from './store';
import App from './views/App';
import { ServerFormActions } from './actions/serverForm';
import { State } from './reducers';
import { serverListActions } from './actions/serverList';

type Actions = ServerFormActions;

const ConnectedApp = connect((state: State) => ({
    isServerListOpen: state.serverList.isOpen,
}), (dispatch: Dispatch<Actions>) => bindActionCreators({
    toggleServerList: serverListActions.toggle,
}, dispatch))(App);

render(
    <Provider store={store}>
        <ConnectedApp />
    </Provider>,
    document.getElementById('app'),
);