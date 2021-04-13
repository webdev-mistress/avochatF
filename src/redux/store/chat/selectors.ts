import _ from 'lodash';
import { IChat, IMemberInfo, IMessage } from '@/redux/store/chat/types';
import { IStore } from '@/redux/utils/types';

// export const selectActiveChat = (state: IChatStore): IChat =>
//   _.get(state, ('chat.activeChatId'), {});

// export const selectSelectedChat = (state: IChatStore): IChat =>
//   _.get(state, 'chat.selectedChat', null);

// export const selectChatMembersList = (state: IChatStore): IMemberInfo[] =>
//   _.get(state, ('chat.chatMembersList'), []);

export const selectActiveChatId = (state: IStore): number | null =>
  _.get(state, ('chat.activeChatId'), null);

export const selectActiveChatName = (state: IStore): string | null => {
  const activeChatName = state.chat.chats
    .find((chat) => chat.id === state.chat.activeChatId)?.name;
  return activeChatName || null;
};

export const selectSelectedChatId = (state: IStore): number | null =>
  _.get(state, 'chat.selectedChatId', null);

export const selectSelectedChatName = (state: IStore): string | null => {
  const selectedChatName = state.chat.chats
    .find((chat) => chat.id === state.chat.selectedChatId)?.name;
  return selectedChatName || null;
};

export const selectChatMembersList = (state: IStore): IMemberInfo[] => {
  const chatMemberList = state.chat.chats
    .find((chat) => chat.id === state.chat.selectedChatId)?.chatMembersList;
  return chatMemberList || [];
};

export const selectSelectedUserOwnerId = (state: IStore): number | null => {
  const selectedUserOwnerId = state.chat.chats
    .find((chat) => chat.id === state.chat.selectedChatId)?.userOwnerId;
  return selectedUserOwnerId || null;
};

export const selectUserChats = (state: IStore): IChat[] =>
  _.get(state, 'chat.chats', []);

export const selectMessages = (state: IStore): IMessage[] => {
  const messages = state.chat.chats
    .find((chat) => chat.id === state.chat.activeChatId)?.messages;
  return messages || [];
};
// _.get(state, ('chat.activeChatInfo.messages'), []);

