import _ from 'lodash';
import { IUserProfileData } from '@/redux/store/user/types';
import { IStore } from '@/redux/utils/types';

export const selectUserId = (state: IStore): number =>
  _.get(state, 'user.userProfileData.id', 0);

export const selectUserLogin = (state: IStore): string =>
  _.get(state, 'user.userProfileData.login', '');

export const selectUserName = (state: IStore): string =>
  _.get(state, 'user.userProfileData.name', '');

export const selectUser = (state: IStore): IUserProfileData | null =>
  _.get(state, 'user.userProfileData', null);

export const selectErrorMessage = (state: IStore): string =>
  _.get(state, 'user.errorMessage', '');

export const selectUserIsAuth = (state: IStore): boolean =>
  _.get(state, 'user.isAuthUser', false);

export const selectIsAuthSpin = (state: IStore): boolean =>
  _.get(state, 'user.isAuthSpin', false);
