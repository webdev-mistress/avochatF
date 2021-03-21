import { getApiActions } from '@/utils/redux';
import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory();

export enum Auth {
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  LOGOUT = 'LOGOUT',
  REMOVE_ERROR_MESSAGE = 'REMOVE_ERROR_MESSAGE',
  CONFIRM_USER = 'CONFIRM_USER',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
}

const [
  signInUserRequest,
  signInUserSucceed,
  signInUserFailed,
] = getApiActions(Auth.SIGN_IN);

const [
  signUpUserRequest,
  signUpUserSucceed,
  signUpUserFailed,
] = getApiActions(Auth.SIGN_UP);

const [
  logoutRequest,
  logoutSucceed,
  logoutFailed,
] = getApiActions(Auth.LOGOUT);

const [
  changePasswordRequest,
  changePasswordSucceed,
  changePasswordFailed,
] = getApiActions(Auth.CHANGE_PASSWORD);

const [
  confirmUserRequest,
  confirmUserFailed,
] = getApiActions(Auth.CONFIRM_USER);

const removeErrorMessage = actionCreator(Auth.REMOVE_ERROR_MESSAGE);

export {
  changePasswordRequest,
  changePasswordSucceed,
  changePasswordFailed,
  removeErrorMessage,
  confirmUserRequest,
  confirmUserFailed,
  signInUserRequest,
  signInUserSucceed,
  signInUserFailed,
  signUpUserRequest,
  signUpUserSucceed,
  signUpUserFailed,
  logoutRequest,
  logoutSucceed,
  logoutFailed,
};
