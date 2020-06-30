import _ from 'lodash';

export const selectActiveChat = (state) => _.get(state, ('chat.activeChat'), {});

export const selectActiveChatId = (state) => _.get(state, ('chat.activeChat.chatId'));

export const selectMessages = (state) => _.get(state, ('chat.activeChat.messages'), []);

export const selectIsCreateChatSpin = (state) => _.get(state, ('chat.isCreateChatSpin'), false);

export const selectIsActiveChatSpin = (state) => _.get(state, ('chat.isActiveChatSpin'), false);
