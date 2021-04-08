import {
  DeleteUserData, EditedChatInfo, EditedMessage,
  IChat, IChatStore, IMemberInfo,
  IMessage,
} from '@/redux/store/chat/types';
import { INITIAL_STATE } from '@/redux/store/chat/reducer';
import { IUserProfileDataWithChats } from '@/redux/store/user/types';

export const createChatSucceedHandler = (
  state: IChatStore,
  chat: IChat,
): IChatStore => ({
  ...state,
  activeChatInfo: chat,
  chats: [
    chat,
    ...state.chats,
  ],
  // for uiReducer
  // isCreateChatSpin: false,
});

export const getActiveChatHandler = (
  state: IChatStore,
  activeChat: IChat,
): IChatStore => ({
  ...state,
  activeChatInfo: activeChat,
});

export const getParticipantsSucceedHandler = (
  state: IChatStore,
  chatMembersInfo: IMemberInfo[],
): IChatStore => ({
  ...state,
  chatMembersList: chatMembersInfo,
});

export const deleteUserFromChatSucceedHandler = (
  state: IChatStore,
  deleteUserData: DeleteUserData,
): IChatStore => ({
  ...state,
  chatMembersList: state.chatMembersList && state.chatMembersList
    .filter(member => member.login !== deleteUserData.login),
});

export const getMessagesSucceedHandler = (
  state: IChatStore,
  messages: IMessage[],
): IChatStore => ({
  ...state,
  activeChatInfo: state.activeChatInfo ? {
    ...state.activeChatInfo,
    messages: messages,
  } : null,
});

export const editMessageSucceedHandler = (
  state: IChatStore,
  editedMessageInfo: EditedMessage,
): IChatStore => ({
  ...state,
  editedMessageInfo: {
    messageId: editedMessageInfo.messageId,
    message: editedMessageInfo.message,
  },
});

export const deleteChatSucceedHandler = (
  state: IChatStore,
  chatId: number,
): IChatStore => ({
  ...state,
  chats: state.chats.filter(chat => chat.id !== chatId),
});

export const editChatNameSucceedHandler = (
  state: IChatStore,
  editedChatInfo: EditedChatInfo,
): IChatStore => {
  const newChatList = state.chats
    .map((chat) => chat.id === editedChatInfo.id
      ? { ...chat, name: editedChatInfo.name }
      : chat);
  return ({
    ...state,
    selectedChat: state.selectedChat && {
      ...state.selectedChat,
      name: editedChatInfo.name,
    },
    chats: newChatList,
  });
};

export const getSelectedChatHandler = (
  state: IChatStore,
  selectedChat: IChat,
): IChatStore => ({
  ...state,
  selectedChat,
});

export const signInSucceedHandler = (
  state: IChatStore,
  userData: IUserProfileDataWithChats,
): IChatStore => ({
  ...state,
  chats: userData.chats,
});

export const clearChatHandler = (
  state: IChatStore,
): IChatStore => ({
  ...state,
  chatMembersList: [],
});

export const logoutHandler = (): IChatStore => INITIAL_STATE;

// for uiReducer
// export const createChatRequestHandler = (
//   state: IChatStore,
// ): IChatStore => ({
//   ...state,
//   isCreateChatSpin: true,
// });

// for uiReducer
// export const deleteChatRequestHandler = (
//   state: IChatStore,
// ): IChatStore => ({
//   ...state,
//   isDeleteChatSpin: true,
// });

// for uiReducer
// export const getParticipantsRequestHandler = (
//   state: IActiveChat,
// ): IActiveChat => ({
//   ...state,
//   isGetParticipantsSpin: true,
// });

// for uiReducer
// export const deleteUserFromChatRequestHandler = (
//   state: IActiveChat,
// ): IActiveChat => ({
//   ...state,
//   isDeleteUserFromChatSpin: true,
// });

// for uiReducer
// export const getMessagesRequestHandler = (
//   state: IActiveChat,
// ): IActiveChat => ({
//   ...state,
//   isGetMessagesSpin: true,
// });

// for uiReducer
// export const editMessageRequestHandler = (
//   state: IActiveChat,
// ): IActiveChat => ({
//   ...state,
//   isEditMessageSpin: true,
// });

// for uiReducer, just spinner
// export const editChatNameRequestHandler = (
//   state: IUser,
//   chatData: ChatData,
// ): IUser => ({
//   ...state,
//   selectedChat: state.selectedChat ? {
//     ...state.selectedChat,
//     name: chatData.name,
//   } : null,
// });
