import { GET_MESSAGES, GET_ACTIVE_CHAT } from '../../constants/store';

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
        default:
            return state;
    }
}
