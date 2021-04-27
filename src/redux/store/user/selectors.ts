import { createSelector } from 'reselect';
import { IUserProfileData } from '@/redux/store/user/types';
import { IStore } from '@/redux/utils/types';

export const selectUser = (state: IStore): IUserProfileData | null => {
  if(!state.user.userProfileData) {
    throw new Error('user is not found');
  }
  return state.user.userProfileData;
};

export const selectUserId = createSelector(
  selectUser,
  (user) => user?.id || null,
);

export const selectUserLogin = createSelector(
  selectUser,
  (user) => user?.login || null,
);

export const selectUserName = createSelector(
  selectUser,
  (user) => user?.name || null,
);

export const selectUserIsAuth = (state: IStore): boolean => state.user.isAuthUser;
