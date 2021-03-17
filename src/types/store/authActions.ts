import { Auth } from '@/constants/store';
import {
  ISignInUserData,
  ISucceededUserData,
  IUserData,
} from '@/types/store/userActions';

export interface IChangePasswordData {
  oldPassword: string,
  newPassword: string,
}

export interface ISignInUserRequest {
  type: Auth.SIGN_IN_REQUEST,
  payload: {
    user: ISignInUserData,
  }
}

export interface IChangePasswordRequest {
  type: Auth.CHANGE_PASSWORD_REQUEST,
  payload: {
    passwordData: IChangePasswordData,
  }
}

export interface IChangePasswordSucceed {
  type: Auth.CHANGE_PASSWORD_SUCCEED,
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
| ISignUpRequestUser | IChangePasswordRequest | IChangePasswordSucceed;
