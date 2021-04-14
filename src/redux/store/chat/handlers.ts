import {
  DeleteUserData, EditedChatInfo, EditedMessage,
  IChat, IChatStore, IGetParticipantsInfo,
  IMessage,
} from '@/redux/store/chat/types';
import { INITIAL_STATE } from '@/redux/store/chat/reducer';
import { IUserProfileDataWithChats } from '@/redux/store/user/types';

export const createChatSucceedHandler = (
  state: IChatStore,
  createdChat: IChat,
): IChatStore => ({
  ...state,
  activeChatId: createdChat.id,
  chats: [
    createdChat,
    ...state.chats,
  ],
  // activeChatInfo: chat,
  // chats: [
  //   chat,
  //   ...state.chats,
  // ],
});

export const getActiveChatHandler = (
  state: IChatStore,
  activeChatId: number,
): IChatStore => ({
  ...state,
  activeChatId,
});

export const getParticipantsSucceedHandler = (
  state: IChatStore,
  getParticipantsInfo: IGetParticipantsInfo,
): IChatStore => ({
  ...state,
  chats: state.chats.map((chat) => chat.id === getParticipantsInfo.chatId
    ? ({ ...chat, chatMembersList: getParticipantsInfo.chatMembersInfo })
    : chat),
  // chatMembersList: chatMembersInfo,
});

export const deleteUserFromChatSucceedHandler = (
  state: IChatStore,
  deleteUserData: DeleteUserData,
): IChatStore => ({
  ...state,
  chats: state.chats.map((chat) => chat.id === deleteUserData.chatId
    ? ({ ...chat, chatMembersList: chat.chatMembersList
      .filter((member) => member.login !== deleteUserData.login) })
    : chat),
  // chatMembersList: state.chatMembersList && state.chatMembersList
  //   .filter(member => member.login !== deleteUserData.login),
});

export const getMessagesSucceedHandler = (
  state: IChatStore,
  messages: IMessage[],
): IChatStore => ({
  ...state,
  chats: state.chats.map((chat) => chat.id === state.activeChatId
    ? ({ ...chat, messages }) : chat),
  // activeChatInfo: state.activeChatInfo ? {
  //   ...state.activeChatInfo,
  //   messages: messages,
  // } : null,
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
): IChatStore => ({
  ...state,
  chats: state.chats
    .map((chat) => chat.id === editedChatInfo.id
      ? { ...chat, name: editedChatInfo.name }
      : chat),
});
// {
//   const newChatList =
// return ({
//   ...state,
//   selectedChat: state.selectedChat && {
//     ...state.selectedChat,
//     name: editedChatInfo.name,
//   },
//   chats: newChatList,
// });
// };

export const getSelectedChatHandler = (
  state: IChatStore,
  selectedChatId: number | null,
): IChatStore => ({
  ...state,
  selectedChatId,
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
  chats: state.chats.map((chat) => chat.id === state.selectedChatId
    ? ({ ...chat, chatMembersList: [] })
    : chat),
  // chatMembersList: [],
});

export const logoutHandler = (): IChatStore => INITIAL_STATE;
