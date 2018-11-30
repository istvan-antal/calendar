import { State } from '../store/reducers';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ServerList from '../views/ServerList';
import { ServerFormActions, serverFormActions } from '../store/actions/serverForm';

const mapStateToProps = (state: State) => ({
    servers: state.serverList.servers,
    isServerFormOpen: state.serverForm.isOpen,
});

const mapDispatchToProps = (dispatch: Dispatch<ServerFormActions>) => (
    bindActionCreators({
        openServerForm: serverFormActions.open,
    }, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(ServerList);