import { Auth } from '@/constants/store';
import {
  IAddNewChat,
  IAddNewChatName,
  IDeleteOldChat,
  IEditChatName, IEditCurrentUserRequest, IEditCurrentUserSucceed,
  IEditUserData,
  IGetSelectedChat,
  ISignInUserData,
  ISucceededUserData,
  IUserData,
} from '@/types/store/userActions';

export interface ISignInUserRequest {
  type: Auth.SIGN_IN_REQUEST,
  payload: {
    user: ISignInUserData,
  }
}

export interface IRequestConfirm {
  type: Auth.CONFIRM_USER_REQUEST,
  payload: {
    token: string,
  }
}

export interface ISignInUserSucceed {
  type: Auth.SIGN_IN_SUCCEED,
  payload: {
    userData: ISucceededUserData,
  }
}

export interface ISignInFailedUser {
  type: Auth.SIGN_IN_FAILED,
  payload: {
    errorMessage: string,
  }
}

export interface ISignUpFailedUser {
  type: Auth.SIGN_UP_FAILED,
  payload: {
    errorMessage: string,
  }
}

export interface ILogoutUser {
  type: Auth.LOGOUT,
}

export interface IRemoveErrorMessage {
  type: Auth.REMOVE_AUTH_ERROR_MESSAGE,
}

export interface ISignUpRequestUser {
  type: Auth.SIGN_UP_REQUEST,
  payload: {
    userData: IUserData,
  }
}

export type AuthActions = ISignInUserRequest | IRequestConfirm | ISignInUserSucceed
| ISignInFailedUser | ISignUpFailedUser | ILogoutUser | IRemoveErrorMessage
| ISignUpRequestUser;
