import { ServerFormActions } from '../actions/serverForm';

interface ServerFormState {
    isOpen?: boolean;
}

export const serverForm = (state: ServerFormState = {}, action: ServerFormActions) => {
    switch (action.type) {
    case 'openServerForm':
        return {
            ...state,
            isOpen: true,
        };
    case 'cancelServerForm':
        return {
            ...state,
            isOpen: undefined,
        };
    default:
        return state;
    }
};
