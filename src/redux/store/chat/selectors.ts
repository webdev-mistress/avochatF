import _ from 'lodash';
import { IChat, IChatStore, IMessage } from '@/redux/store/chat/types';

// export const selectActiveChat = (state: IChatStore): IChat =>
//   _.get(state, ('chat.activeChatId'), {});

// export const selectSelectedChat = (state: IChatStore): IChat =>
//   _.get(state, 'chat.selectedChat', null);

// export const selectChatMembersList = (state: IChatStore): IMemberInfo[] =>
//   _.get(state, ('chat.chatMembersList'), []);

export const selectActiveChatId = (state: IChatStore): number | null =>
  _.get(state, ('chat.activeChatInfo.id'), null);

export const selectSelectedChatId = (state: IChatStore): number | null =>
  _.get(state, 'chat.selectedChatId', null);

export const selectSelectedChatName = (state: IChatStore): string | null => {
  const selectedChatName = state.chats
    .find((chat) => chat.id === state.selectedChatId)?.name;
  return selectedChatName || null;
};

export const selectSelectedUserOwnerId = (state: IChatStore): number | null => {
  const selectedUserOwnerId = state.chats
    .find((chat) => chat.id === state.selectedChatId)?.userOwnerId;
  return selectedUserOwnerId || null;
};

export const selectUserChats = (state: IChatStore): IChat[] =>
  _.get(state, 'chat.chats', []);

export const selectMessages = (state: IChatStore): IMessage[] =>
  _.get(state, ('chat.activeChatInfo.messages'), []);

