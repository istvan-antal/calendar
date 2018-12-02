import { State } from '../store/reducers';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppMenu from '../views/AppMenu';
import { appMenuActions } from '../store/actions/appMenu';
import { serverListActions } from '../store/actions/serverList';

const mapStateToProps = (state: State) => ({
    isAppMenuOpen: state.appMenu.isOpen,
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({
        toggleAppMenu: appMenuActions.toggle,
        closeAppMenu: appMenuActions.close,
        openServerList: serverListActions.open,
    },
    dispatch,
));

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu);