import { combineReducers } from 'redux';
import { serverList } from './serverList';

const reducers = combineReducers({
    serverList,
});

export type State = ReturnType<typeof reducers>;

export default reducers;