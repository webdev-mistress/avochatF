import _ from 'lodash';
import { IUserProfileData, IUserStore } from '@/redux/store/user/types';

export const selectUserId = (state: IUserStore): number =>
  _.get(state, 'user.userProfileData.id', 0);

export const selectUserLogin = (state: IUserStore): string =>
  _.get(state, 'user.userProfileData.login', '');

export const selectUserName = (state: IUserStore): string =>
  _.get(state, 'user.userProfileData.name', '');

export const selectUser = (state: IUserStore): IUserProfileData | null =>
  _.get(state, 'user.userProfileData', null);

export const selectErrorMessage = (state: IUserStore): string =>
  _.get(state, 'user.errorMessage', '');

export const selectUserIsAuth = (state: IUserStore): boolean =>
  _.get(state, 'user.isAuthUser', false);

export const selectIsAuthSpin = (state: IUserStore): boolean =>
  _.get(state, 'user.isAuthSpin', false);
