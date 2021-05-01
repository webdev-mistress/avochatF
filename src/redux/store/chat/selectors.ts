import { createSelector } from 'reselect';
import _ from 'lodash';
import { IChat } from '@/redux/store/chat/types';
import { IStore } from '@/redux/utils/types2';

export const selectUserChats = (state: IStore): IChat[] =>
  state.chat.chats;

export const selectSelectedChatId = (state: IStore): number | null =>
  state.chat.selectedChatId;

export const selectActiveChatId = (state: IStore): number | null =>
  state.chat.activeChatId;

export const selectActiveChat = createSelector(
  selectUserChats,
  selectActiveChatId,
  (chats, activeChatId) => {
    if(activeChatId === null) {
      return null;
    }
    const activeChat = chats.find((chat) => chat.id === activeChatId);
    if (_.isUndefined(activeChat)) {
      throw new Error('activeChat is not found');
    }
    return activeChat;
  },
);

export const selectSelectedChat = createSelector(
  selectUserChats,
  selectSelectedChatId,
  (chats, selectedChatId) => {
    if(selectedChatId === null) {
      return null;
    }
    const selectedChat = chats.find((chat) => chat.id === selectedChatId);
    if(_.isUndefined(selectedChat)) {
      throw new Error('selectedChat is not found');
    }
    return selectedChat;
  },
);

export const selectActiveChatName = createSelector(
  selectUserChats,
  selectActiveChat,
  (chats, activeChat) => activeChat?.name || null,
);

export const selectSelectedChatName = createSelector(
  selectSelectedChat,
  (selectedChat) => selectedChat?.name || null,
);

export const selectChatMembersList = createSelector(
  selectSelectedChat,
  (selectedChat) => selectedChat?.chatMembersList || [],
);

export const selectSelectedUserOwnerId = createSelector(
  selectSelectedChat,
  (selectedChat) => selectedChat?.userOwnerId || null,
);

export const selectMessages = createSelector(
  selectActiveChat,
  (activeChat) => activeChat?.messages || [],
);
