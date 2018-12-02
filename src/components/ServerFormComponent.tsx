import { ServerForm, ServerFormProps } from '../views/ServerForm';
import { Dispatch, bindActionCreators } from 'redux';
import { ServerFormActions, serverFormActions } from '../store/actions/serverForm';
import { connect } from 'react-redux';

const mapStateToProps = () => ({
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