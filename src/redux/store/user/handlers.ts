import _ from 'lodash';
import {
  EditUserData,
  IUserProfileDataWithChats, IUserStore,
} from '@/redux/store/user/types';
import { INITIAL_STATE } from '@/redux/store/user/reducer';

export const logoutHandler = (): IUserStore => INITIAL_STATE;

// for uiReducer
// export const editCurrentUserRequestHandler = (
//   state: IUser,
// ): IUser => ({
//   ...state,
//   isEditCurrentUser: true,
// });

// done
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

// for uiReducer
// export const signAllRequestHandler = (
//   state: IUser,
// ): IUser => ({
//   ...state,
//   isAuthSpin: true,
// });

// half done, everything else is chatReducer and AuthReducer
export const signInSucceedHandler = (
  // chats for chatReducer
  state: IUserStore,
  userData: IUserProfileDataWithChats,
): IUserStore => ({
  ...state,
  userProfileData: _.omit(userData, ['chats']),
  isAuthUser: true,
  // for uiReducer
  // isAuthSpin: false,
});

// for uiReducer
// export const removeAuthErrorMessageHandler = (
//   state: IUser,
// ): IUser => ({
//   ...state,
//   errorMessage: '',
// });

// half done, everything else is chatReducer and AuthReducer
export const signAllFailedHandler = (
  state: IUserStore,
  // for uiReducer
  // errorMessage: string,
): IUserStore => ({
  ...state,
  isAuthUser: false,
  // for uiReducer
  // isAuthSpin: false,
  // errorMessage: errorMessage,
});
