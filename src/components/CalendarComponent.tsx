import { State } from '../store/reducers';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Calendar from '../views/Calendar';

const mapStateToProps = (state: State) => ({
    currentTime: state.currentView.currentTime,
    events: state.events,
    calendarColors: state.calendarList.calendarColors,
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({
    },
    dispatch,
));

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);