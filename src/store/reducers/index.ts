import { combineReducers } from 'redux';
import { serverList } from './serverList';
import { serverForm } from './serverForm';
import { currentView } from './currentView';
import { events } from './events';
import { appMenu } from './appMenu';

const reducers = combineReducers({
    currentView,
    serverList,
    serverForm,
    events,
    appMenu,
});

export type State = ReturnType<typeof reducers>;

export default reducers;