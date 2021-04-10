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

export const selectChatMembersList = (state: IChatStore): IMemberInfo[] =>
  _.get(state, ('chat.chatMembersList'), []);
