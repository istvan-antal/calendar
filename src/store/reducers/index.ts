import { combineReducers } from 'redux';
import { serverList } from './serverList';
import { serverForm } from './serverForm';
import { currentView } from './currentView';
import { events } from './events';

const reducers = combineReducers({
    currentView,
    serverList,
    serverForm,
    events,
});

export type State = ReturnType<typeof reducers>;

export default reducers;