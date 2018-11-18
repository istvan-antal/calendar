import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers';
import { serverListMiddleware, initServerListMiddleware } from './middleware/serverList';

// tslint:disable-next-line:no-any
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type State = ReturnType<typeof reducers>;

const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(serverListMiddleware),
    ),
);

initServerListMiddleware(store);

export default store;