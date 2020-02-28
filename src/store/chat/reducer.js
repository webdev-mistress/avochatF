import { MESSAGES_SUCCEEDED, GET_ACTIVE_CHAT, USER_LOGOUT } from '../../constants/store';

const initialState = {
    messages: [],
};

export function chatReducer(state = initialState, action) {
    switch (action.type) {
        case MESSAGES_SUCCEEDED:
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
