import _ from 'lodash';

export const selectUserId = (state) => _.get(state, ('user.userId'));

export const selectUserName = (state) => _.get(state, ('user.name'));

export const selectUserChats = (state) => _.get(state, ('user.chats'));

export const selectErrorMessage = (state) => _.get(state, ('user.errorMessage'));
