import { AppMenuAction } from '../actions/appMenu';

interface State {
    isOpen: boolean;
}

const defaultState: State = {
    isOpen: false,
};

export const appMenu = (state = defaultState, action: AppMenuAction) => {
    switch (action.type) {
    case 'appMenu/open':
        return {
            ...state,
            isOpen: true,
        };
    case 'appMenu/close':
        return {
            ...state,
            isOpen: false,
        };
    case 'appMenu/toggle':
        return {
            ...state,
            isOpen: !state.isOpen,
        };
    default:
        return state;
    }
};