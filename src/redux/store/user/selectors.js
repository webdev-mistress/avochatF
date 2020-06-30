import _ from 'lodash';

export const selectUserId = (state) => _.get(state, 'user.userId', 0);

export const selectUserLogin = (state) => _.get(state, 'user.login', '');

export const selectUserName = (state) => _.get(state, 'user.name', '');

export const selectUserChats = (state) => _.get(state, 'user.chats', []);

export const selectErrorMessage = (state) => _.get(state, 'user.errorMessage', '');

export const selectUserIsAuth = (state) => _.get(state, 'user.isAuth', false);

export const selectIsAuthSpin = (state) => _.get(state, 'user.isAuthSpin', false);
