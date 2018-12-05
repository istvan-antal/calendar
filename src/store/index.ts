import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import { initServerListMiddleware } from './middleware/serverList';
import { serverFormMiddleware } from './middleware/serverForm';
import { initCurrentViewMiddleware } from './middleware/currentView';
import { calendarListMiddleware, initCalendarListMiddleware } from './middleware/calendarList';
import { initServerWebsocketMiddleware, websocketMiddleware } from './middleware/websocket';

// tslint:disable-next-line:no-any
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(
            websocketMiddleware,
            serverFormMiddleware,
            calendarListMiddleware,
        ),
    ),
);

initServerWebsocketMiddleware(store);
initCurrentViewMiddleware(store);
initServerListMiddleware(store);
initCalendarListMiddleware(store);

export default store;