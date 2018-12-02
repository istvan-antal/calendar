import { State } from '../store/reducers';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CalendarList from '../views/CalendarList';
import { calendarListActions } from '../store/actions/calendarList';

const mapStateToProps = (state: State) => ({
    calendars: state.calendarList.calendars,
    calendarColors: state.calendarList.calendarColors,
});

const mapDispatchToProps = (dispatch: Dispatch) => (bindActionCreators({
    close: calendarListActions.close,
    setCalendarColor: calendarListActions.setCalendarColor,
},
dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(CalendarList);