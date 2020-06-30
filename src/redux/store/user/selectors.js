import _ from 'lodash';

export const selectUserId = (state) => _.get(state, 'user.user.userId', 0);

export const selectUserLogin = (state) => _.get(state, 'user.user.login', '');

export const selectUserName = (state) => _.get(state, 'user.user.name', '');

export const selectUserChats = (state) => _.get(state, 'user.user.chats', []);

export const selectErrorMessage = (state) => _.get(state, 'user.errorMessage', '');

export const selectIsAuth = (state) => _.get(state, 'user.user.isAuth', false);

export const selectIsAuthSpin = (state) => _.get(state, 'user.isAuthSpin', false);
