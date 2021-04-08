import _ from 'lodash';
import { IChat, IChatStore, IMemberInfo, IMessage } from '@/redux/store/chat/types';

export const selectActiveChat = (state: IChatStore): IChat =>
  _.get(state, ('chat.activeChatInfo'), {});

export const selectActiveChatId = (state: IChatStore): number =>
  _.get(state, ('chat.activeChatInfo.id'), null);

export const selectSelectedChat = (state: IChatStore): IChat =>
  _.get(state, 'chat.selectedChat', null);

export const selectUserChats = (state: IChatStore): IChat[] =>
  _.get(state, 'chat.chats', []);

export const selectMessages = (state: IChatStore): IMessage[] =>
  _.get(state, ('chat.activeChatInfo.messages'), []);

// for uiStore and uiReducer
// export const selectIsCreateChatSpin = (state: IChatStore): boolean =>
//   _.get(state, ('chat.isCreateChatSpin'), false);
//
// export const selectIsActiveChatSpin = (state: IChatStore): boolean =>
//   _.get(state, ('chat.isActiveChatSpin'), false);

export const selectChatMembersList = (state: IChatStore): IMemberInfo[] =>
  _.get(state, ('chat.chatMembersList'), []);
