import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { IUser } from '@/redux/store/user/types';
import {
  createChatSucceed,
  deleteChatSucceed,
  editChatNameRequest, editChatNameSucceed,
} from '@/redux/store/chat/actions';
import {
  createChatSucceedHandler,
  deleteChatSucceedHandler,
  editChatNameRequestHandler,
  editChatNameSucceedHandler,
  editCurrentUserRequestHandler,
  editCurrentUserSucceedHandler,
  getSelectedChatHandler,
  logoutHandler,
  removeAuthErrorMessageHandler, signAllFailedHandler,
  signAllRequestHandler,
  signInSucceedHandler,
} from '@/redux/store/user/handlers';
import {
  editCurrentUserSucceed,
  getSelectedChat,
  logout,
  removeAuthErrorMessage,
  signInFailed,
  signInRequest,
  signInSucceed, signUpFailed,
  signUpRequest,
} from '@/redux/store/user/actions';

export const INITIAL_STATE: IUser = {
  id: 0,
  name: '',
  login: '',
  email: '',
  isAuth: false,
  isAuthSpin: false,
  isEditCurrentUser: false,
  chats: [],
  selectedChat: null,
  errorMessage: '',
};

export const userReducer = reducerWithInitialState(INITIAL_STATE)
  .case(deleteChatSucceed, deleteChatSucceedHandler)
  .case(createChatSucceed, createChatSucceedHandler)
  .case(editChatNameRequest, editChatNameRequestHandler)
  .case(editChatNameSucceed, editChatNameSucceedHandler)
  .case(getSelectedChat, getSelectedChatHandler)
  .case(logout, logoutHandler)
  .case(editChatNameRequest, editCurrentUserRequestHandler)
  .case(editCurrentUserSucceed, editCurrentUserSucceedHandler)
  .case(signInRequest, signAllRequestHandler)
  .case(signUpRequest, signAllRequestHandler)
  .case(signInSucceed, signInSucceedHandler)
  .case(removeAuthErrorMessage, removeAuthErrorMessageHandler)
  .case(signInFailed, signAllFailedHandler)
  .case(signUpFailed, signAllFailedHandler)
  .build();

// changePasswordRequest, not ready in old reducer
// changePasswordSucceed, not ready in old reducer

// changePasswordFailed,
// editCurrentUserFailed,

// signUpSucceed - not clearly yet if this function will exist
// confirmUser - does not exist in old redux

