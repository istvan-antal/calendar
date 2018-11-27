import { combineReducers } from 'redux';
import { serverList } from './serverList';
import { serverForm } from './serverForm';
import { currentView } from './currentView';

const reducers = combineReducers({
    currentView,
    serverList,
    serverForm,
});

export type State = ReturnType<typeof reducers>;

export default reducers;