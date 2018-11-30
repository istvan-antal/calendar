import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import { serverListMiddleware, initServerListMiddleware } from './middleware/serverList';
import { serverFormMiddleware } from './middleware/serverForm';
import { initCurrentViewMiddleware } from './middleware/currentView';

// tslint:disable-next-line:no-any
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(serverListMiddleware, serverFormMiddleware),
    ),
);

initServerListMiddleware(store);
initCurrentViewMiddleware(store);

export default store;