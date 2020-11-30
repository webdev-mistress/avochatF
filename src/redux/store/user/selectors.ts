import _ from 'lodash';
import { IChat, IUser } from '@/types/store';

export const selectUserId = (state: IUser): number => _.get(state, 'user.userId', 0);

export const selectUserLogin = (state: IUser): string => _.get(state, 'user.login', '');

export const selectUserName = (state: IUser): string => _.get(state, 'user.name', '');

export const selectUser = (state: IUser): IUser => _.get(state, 'user', undefined);

export const selectUserChats = (state: IUser): IChat[] => _.get(state, 'user.chats', []);

export const selectErrorMessage = (state: IUser): string => _.get(state, 'user.errorMessage', '');

export const selectUserIsAuth = (state: IUser): boolean => _.get(state, 'user.isAuth', false);

export const selectIsAuthSpin = (state: IUser): boolean => _.get(state, 'user.isAuthSpin', false);

export const selectSelectedChat = (state: IUser): IChat => _.get(state, 'user.selectedChat', undefined);
