import { ServerForm, ServerFormProps } from '../views/ServerForm';
import { State } from '../reducers';
import { Dispatch, bindActionCreators } from 'redux';
import { ServerFormActions, serverFormActions } from '../actions/serverForm';
import { connect } from 'react-redux';

const mapStateToProps = (state: State): { } => ({
});

const mapDispatchToProps = (dispatch: Dispatch<ServerFormActions>): {
    actions: ServerFormProps['actions'];
} => ({
    actions: bindActionCreators({
        cancelServerForm: serverFormActions.cancel,
        saveServerForm: serverFormActions.save,
        setServer: serverFormActions.setServer,
        setUsername: serverFormActions.setUsername,
        setPassword: serverFormActions.setPassword,
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServerForm);