import {
    MESSAGES_SUCCEEDED,
    GET_ACTIVE_CHAT,
    CLEAR_CHAT,
    EDIT_MESSAGE,
    ADD_NEW_CHAT,
    CREATE_CHAT
} from '@/constants/store';

const initialState = {
    isCreateChatSpin: false,
    isActiveChatSpin: false,
};

export function chatReducer(state = initialState, action) {
    switch (action.type) {
        case MESSAGES_SUCCEEDED:
            return {
                ...state,
                activeChat: {
                    ...state.activeChat,
                    messages: action.payload,
                },
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
                    editMessageId: action.payload.messageData.messageId,
                    messageEdit: action.payload.messageData.content,
                };
        case CREATE_CHAT:
            return {
                ...state,
                isCreateChatSpin: true,
            };
        case ADD_NEW_CHAT:
            return {
                ...state,
                isCreateChatSpin: false,
            };
        default:
        return state;
    }
}
