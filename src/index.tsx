import * as React from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import store, { State } from './store';
import App from './views/App';
import { serverFormActions, ServerFormActions } from './actions/serverForm';

type Actions = ServerFormActions;

const ConnectedApp = connect((state: State) => ({
    isServerFormOpen: state.serverForm.isOpen,
}), (dispatch: Dispatch<Actions>) => bindActionCreators({
    openServerForm: serverFormActions.open,
}, dispatch))(App);

render(
    <Provider store={store}>
        <ConnectedApp />
    </Provider>,
    document.getElementById('app'),
);