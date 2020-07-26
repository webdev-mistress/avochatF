import _ from 'lodash';
import { IActiveChat, IChat, IMembersData, IMessage } from '@/types/store';

export const selectActiveChat = (state: IActiveChat): IChat => _.get(state, ('activeChat.info'), {});

export const selectActiveChatId = (state: IActiveChat): number => _.get(state, ('activeChat.info.chatId'), 0);

export const selectMessages = (state: IActiveChat): IMessage[] => _.get(state, ('activeChat.info.messages'), []);

export const selectIsCreateChatSpin = (state: IActiveChat): boolean =>
    _.get(state, ('activeChat.isCreateChatSpin'), false);

export const selectIsActiveChatSpin = (state: IActiveChat): boolean =>
    _.get(state, ('activeChat.isActiveChatSpin'), false);

export const selectChatMembersList = (state: IActiveChat): IMembersData[] =>
    _.get(state, ('activeChat.chatMembersList'), []);
