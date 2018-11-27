import { CurrentViewAction } from '../actions/currentView';

interface State {
    currentTime: string;
}

const defaultState: State = {
    currentTime: '1970-01-01T00:00:01.000+00:00',
};

export const currentView = (state = defaultState, action: CurrentViewAction) => {
    switch (action.type) {
    case 'currentView/receiveCurrentTime':
        return {
            ...state,
            currentTime: action.payload,
        };
    default:
        return state;
    }
};