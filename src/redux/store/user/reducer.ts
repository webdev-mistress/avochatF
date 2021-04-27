import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { IUserStore } from '@/redux/store/user/types';
import {
  editCurrentUserSucceedHandler,
  logoutHandler,
  signInSucceedHandler,
} from '@/redux/store/user/handlers';
import {
  editCurrentUserSucceed,
  logout,
  signInSucceed,
} from '@/redux/store/user/actions';

export const INITIAL_STATE: IUserStore = {
  userProfileData: null,
  isAuthUser: false,
};

export const userReducer = reducerWithInitialState(INITIAL_STATE)
  .case(logout, logoutHandler)
  .case(editCurrentUserSucceed, editCurrentUserSucceedHandler)
  .case(signInSucceed, signInSucceedHandler)
  .build();
