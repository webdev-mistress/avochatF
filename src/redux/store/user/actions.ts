import { getApiActions } from '@/utils/redux';
import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory();

export enum User {
  ADD_USER_TO_CHAT = 'ADD_USER_TO_CHAT',
  EDIT_CURRENT_USER = 'EDIT_CURRENT_USER',
}

export enum Auth {
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  LOGOUT = 'LOGOUT',
  REMOVE_AUTH_ERROR_MESSAGE = 'REMOVE_AUTH_ERROR_MESSAGE',
  CONFIRM_USER = 'CONFIRM_USER',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
}

const logout = actionCreator(Auth.LOGOUT);
const removeAuthErrorMessage = actionCreator(Auth.REMOVE_AUTH_ERROR_MESSAGE);

const [
  addUserToChatRequest,
  addUserToChatSucceed,
] = getApiActions(User.ADD_USER_TO_CHAT);

const [
  editCurrentUserRequest,
  editCurrentUserSucceed,
] = getApiActions(User.EDIT_CURRENT_USER);

const [
  signInRequest,
  signInSucceed,
] = getApiActions(Auth.SIGN_IN);

const [
  signUpRequest,
  signUpSucceed,
] = getApiActions(Auth.SIGN_UP);

const [
  confirmUserRequest,
  confirmUserSucceed,
] = getApiActions(Auth.CONFIRM_USER);

const [
  changePasswordRequest,
  changePasswordSucceed,
] = getApiActions(Auth.CHANGE_PASSWORD);

export {
  addUserToChatRequest,
  addUserToChatSucceed,
  editCurrentUserRequest,
  editCurrentUserSucceed,
  confirmUserRequest,
  confirmUserSucceed,
  logout,
  signInRequest,
  signInSucceed,
  signUpRequest,
  signUpSucceed,
  removeAuthErrorMessage,
  changePasswordRequest,
  changePasswordSucceed,
};
