import * as React from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import store from './store';
import App from './views/App';
import { ServerFormActions } from './store/actions/serverForm';
import { State } from './store/reducers';
import { serverListActions } from './store/actions/serverList';

type Actions = ServerFormActions;

const ConnectedApp = connect((state: State) => ({
    isServerListOpen: state.serverList.isOpen,
    currentTime: state.currentView.currentTime,
}), (dispatch: Dispatch<Actions>) => bindActionCreators({
    toggleServerList: serverListActions.toggle,
}, dispatch))(App);

render(
    <Provider store={store}>
        <ConnectedApp />
    </Provider>,
    document.getElementById('app'),
);