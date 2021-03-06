import { Chat, User } from '@/constants/store';
import { ChatActions, IActiveChat } from '@/types/store/chatActions';

const initialState: IActiveChat = {
  isCreateChatSpin: false,
  isActiveChatSpin: false,
  chatMembersList: [],
};

export function chatReducer(
  state = initialState, action: ChatActions ,
): IActiveChat {
  switch (action.type) {
  case Chat.CREATE_CHAT:
    return {
      ...state,
      isCreateChatSpin: true,
    };
  case Chat.ADD_NEW_CHAT:
    return {
      ...state,
      info: action.payload.chat,
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
  case Chat.GET_CHAT_PARTICIPANTS_LOADED:
    return {
      ...state,
      chatMembersList: action.payload.data,
    };
  case Chat.DELETE_USER_FROM_CHAT:
    return {
      ...state,
      chatMembersList: state.chatMembersList && state.chatMembersList
        .filter(member => member.login !== action.payload.login),
    };
  case User.LOGOUT:
    return initialState;
  default:
    return state;
  }
}
