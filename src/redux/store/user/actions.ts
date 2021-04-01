import { getApiActions } from '@/utils/redux';
import actionCreatorFactory from 'typescript-fsa';
import { IChat } from '@/redux/store/chat/types';
const actionCreator = actionCreatorFactory();

export enum User {
  ADD_USER_TO_CHAT = 'ADD_USER_TO_CHAT',
  GET_SELECTED_CHAT = 'GET_SELECTED_CHAT',
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

const getSelectedChat = actionCreator<IChat>(User.GET_SELECTED_CHAT);
const confirmUserRequest = actionCreator(Auth.CONFIRM_USER);
const logout = actionCreator(Auth.LOGOUT);
const removeAuthErrorMessage = actionCreator(Auth.REMOVE_AUTH_ERROR_MESSAGE);

const [
  addUserToChatRequest,
  addUserToChatSucceed,
  addUserToChatFailed,
] = getApiActions(User.ADD_USER_TO_CHAT);

const [
  editCurrentUserRequest,
  editCurrentUserSucceed,
  editCurrentUserFailed,
] = getApiActions(User.EDIT_CURRENT_USER);

// const [
//   getSelectedChatRequest,
//   getSelectedChatSucceed,
//   getSelectedChatFailed,
// ] = getApiActions(User.GET_SELECTED_CHAT);

const [
  signInRequest,
  signInSucceed,
  signInFailed,
] = getApiActions(Auth.SIGN_IN);

const [
  signUpRequest,
  signUpSucceed,
  signUpFailed,
] = getApiActions(Auth.SIGN_UP);

const [
  changePasswordRequest,
  changePasswordSucceed,
  changePasswordFailed,
] = getApiActions(Auth.CHANGE_PASSWORD);

export {
  addUserToChatRequest,
  addUserToChatSucceed,
  addUserToChatFailed,
  // getSelectedChatRequest,
  // getSelectedChatSucceed,
  // getSelectedChatFailed,
  editCurrentUserRequest,
  editCurrentUserSucceed,
  editCurrentUserFailed,
  getSelectedChat,
  confirmUserRequest,
  logout,
  signInRequest,
  signInSucceed,
  signInFailed,
  signUpRequest,
  signUpSucceed,
  signUpFailed,
  removeAuthErrorMessage,
  changePasswordRequest,
  changePasswordSucceed,
  changePasswordFailed,
};
