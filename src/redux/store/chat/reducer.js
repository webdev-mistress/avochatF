import { MESSAGES_SUCCEEDED, GET_ACTIVE_CHAT, CLEAR_CHAT, EDIT_MESSAGE } from '../../../constants/store';

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
            case CLEAR_CHAT:
                return initialState;
            case EDIT_MESSAGE:
                return {
                    ...state,
                    editMessageId: action.payload.messageData.MessageId,
                    messageEdit: action.payload.messageData.content,
                };
            default:
            return state;
    }
}
