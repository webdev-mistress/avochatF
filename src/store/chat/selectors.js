import _ from 'lodash';

export const selectActiveChatId = (state) => _.get(state, ('chat.activeChat.chatId'));

export const selectMessages = (state) => _.get(state, ('chat.messages'), []);

export const selectActiveChat = (state) => _.get(state, ('chat.activeChat'), {});
