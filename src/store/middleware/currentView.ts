import { MiddlewareAPI, Dispatch } from 'redux';
import { State } from '../../reducers';
import { CurrentViewAction, currentViewActions } from '../../actions/currentView';
import { DateTime } from 'luxon';

export const currentViewMiddleware = (store: MiddlewareAPI<Dispatch, State>) => (
    next: Dispatch<CurrentViewAction>,
) => (action: CurrentViewAction) => {
    const result = next(action);

    switch (action.type) {
        default:
        break;
    }

    return result;
};

export const initCurrentViewMiddleware = (store: MiddlewareAPI<Dispatch, State>) => {
    store.dispatch(currentViewActions.receiveDefaultTimezone(DateTime.local().zoneName));
    const updateTime = () => {
        store.dispatch(currentViewActions.receiveCurrentTime(DateTime.local().toISO()));
    };
    updateTime();
    // tslint:disable-next-line:no-magic-numbers
    setInterval(updateTime, 60000);
};