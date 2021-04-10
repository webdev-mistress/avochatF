import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { IUserStore } from '@/redux/store/user/types';
import {
  editCurrentUserSucceedHandler,
  logoutHandler,
  signAllFailedHandler,
  signInSucceedHandler,
} from '@/redux/store/user/handlers';
import {
  editCurrentUserSucceed,
  logout,
  signInFailed,
  signInSucceed, signUpFailed,
} from '@/redux/store/user/actions';

export const INITIAL_STATE: IUserStore = {
  userProfileData: null,
  isAuthUser: false,
};

export const userReducer = reducerWithInitialState(INITIAL_STATE)
  .case(logout, logoutHandler)
  .case(editCurrentUserSucceed, editCurrentUserSucceedHandler)
  .case(signInSucceed, signInSucceedHandler)
  .case(signInFailed, signAllFailedHandler)
  .case(signUpFailed, signAllFailedHandler)
  .build();
