import { combineReducers } from 'redux';
import { serverList } from './serverList';
import { serverForm } from './serverForm';

const reducers = combineReducers({
    serverList,
    serverForm,
});

export type State = ReturnType<typeof reducers>;

export default reducers;