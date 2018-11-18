import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import { serverListMiddleware } from './middleware/serverList';

export type State = ReturnType<typeof reducers>;

const store = createStore(
    reducers,
    applyMiddleware(serverListMiddleware),
);

export default store;