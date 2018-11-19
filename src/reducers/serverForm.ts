import { ServerFormActions } from '../actions/serverForm';

interface ServerFormState {
    isOpen?: boolean;
    server: string;
    username: string;
    password: string;
}

export const serverForm = (
    state: ServerFormState = {
        server: '',
        username: '',
        password: '',
    },
    action: ServerFormActions,
) => {
    switch (action.type) {
    case 'serverForm/setServer':
        return {
            ...state,
            server: action.payload,
        };
    case 'serverForm/setUsername':
        return {
            ...state,
            username: action.payload,
        };
    case 'serverForm/setPassword':
        return {
            ...state,
            password: action.payload,
        };
    case 'serverForm/open':
        return {
            ...state,
            server: '',
            username: '',
            password: '',
            isOpen: true,
        };
    case 'serverForm/cancel':
        return {
            ...state,
            isOpen: undefined,
        };
    default:
        return state;
    }
};
