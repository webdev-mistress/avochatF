import _ from 'lodash';
import {
  EditUserData,
  IUserProfileDataWithChats, IUserStore,
} from '@/redux/store/user/types';
import { INITIAL_STATE } from '@/redux/store/user/reducer';

export const logoutHandler = (): IUserStore => INITIAL_STATE;

export const editCurrentUserSucceedHandler = (
  state: IUserStore,
  editUserData: EditUserData,
): IUserStore => ({
  ...state,
  userProfileData: state.userProfileData ? {
    ...state.userProfileData,
    ...editUserData,
  } : state.userProfileData,
});

export const signInSucceedHandler = (
  state: IUserStore,
  userData: IUserProfileDataWithChats,
): IUserStore => ({
  ...state,
  userProfileData: _.omit(userData, ['chats']),
  isAuthUser: true,
});
