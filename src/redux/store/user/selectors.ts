import _ from 'lodash';
// import { IUser } from '@/redux/store/user/types';
// import { IChat } from '@/redux/store/chat/types';
import { IUserProfileData, IUserStore } from '@/redux/store/user/types';

export const selectUserId = (state: IUserStore): number =>
  _.get(state, 'user.userProfileData.id', 0);

export const selectUserLogin = (state: IUserStore): string =>
  _.get(state, 'user.userProfileData.login', '');

export const selectUserName = (state: IUserStore): string =>
  _.get(state, 'user.userProfileData.name', '');

export const selectUser = (state: IUserStore): IUserProfileData | null =>
  _.get(state, 'user.userProfileData', null);

// move to chats
// export const selectUserChats = (state: IUserStore): IChat[] =>
//   _.get(state, 'user.chats', []);

export const selectErrorMessage = (state: IUserStore): string =>
  _.get(state, 'user.errorMessage', '');

export const selectUserIsAuth = (state: IUserStore): boolean =>
  _.get(state, 'user.isAuthUser', false);

export const selectIsAuthSpin = (state: IUserStore): boolean =>
  _.get(state, 'user.isAuthSpin', false);

// move to chat selectors
// export const selectSelectedChat = (state: IUserStore): IChat =>
//   _.get(state, 'user.selectedChat', undefined);
