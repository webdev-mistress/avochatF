import { GET_MESSAGES, GET_ACTIVE_CHAT, USER_LOGOUT } from '../../constants/store';

const initialState = {
    messages: [],
};

export function chatReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MESSAGES:
            return {
                ...state,
                messages: action.payload,
            };
        case GET_ACTIVE_CHAT:
            return {
                ...state,
                activeChat: action.payload,
            };
            case USER_LOGOUT:
                return initialState;
            default:
            return state;
    }
}
