import { Chat } from '@/constants/store';
import { ChatAction, IActiveChat } from '@/types/store';

const initialState: IActiveChat = {
    isCreateChatSpin: false,
    isActiveChatSpin: false,
    chatMembersList: [],
};

export function chatReducer(state = initialState, action: ChatAction): IActiveChat {
    switch (action.type) {
        case Chat.CREATE_CHAT:
            return {
                ...state,
                isCreateChatSpin: true,
            };
        case Chat.ADD_NEW_CHAT:
            return {
                ...state,
                isCreateChatSpin: false,
            };
        case Chat.MESSAGES_SUCCEEDED:
            return {
                ...state,
                info: state.info ? {
                    ...state.info,
                    messages: action.payload,
                } : undefined,
            };
        case Chat.GET_ACTIVE_CHAT:
            return {
                ...state,
                info: action.payload,
            };
        case Chat.CLEAR_CHAT:
            return initialState;
        case Chat.EDIT_MESSAGE:
            return {
                ...state,
                editMessageId: action.payload.messageData.editMessageId,
                messageEdit: action.payload.messageData.messageEdit,
            };
        case Chat.CHECK_MEMBERS_LOADED:
            return {
                ...state,
                chatMembersList: action.payload.data,
            };
        default:
        return state;
    }
}
