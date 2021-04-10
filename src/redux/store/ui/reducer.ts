import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
  setShowChatSettings,
  setShowCreateChat, setShowLogout,
  setShowUserSettings, UI,
} from '@/redux/store/ui/actions';
import {
  logoutHandler,
  setDialogsSettingsHandler, setErrorHandler, setLoaderHandler,
  setShowChatSettingsHandler,
} from '@/redux/store/ui/handlers';
import { IUI } from '@/redux/store/ui/types';
import {
  addUserToChatFailed,
  addUserToChatRequest,
  addUserToChatSucceed,
  Auth, changePasswordFailed,
  changePasswordRequest, changePasswordSucceed, confirmUserFailed,
  confirmUserRequest, confirmUserSucceed, editCurrentUserFailed,
  editCurrentUserRequest, editCurrentUserSucceed,
  logout, signInFailed,
  signInRequest, signInSucceed, signUpFailed,
  signUpRequest, signUpSucceed,
  User,
} from '@/redux/store/user/actions';
import { getInitialState, loadersAndErrorsTypes } from '@/redux/utils/redux';
import {
  Chat,
  createChatRequest,
  createChatSucceed,
  deleteChatFailed,
  deleteChatRequest,
  deleteChatSucceed,
  deleteMessageFailed,
  deleteMessageRequest,
  deleteMessageSucceed,
  deleteUserFromChatFailed,
  deleteUserFromChatRequest,
  deleteUserFromChatSucceed,
  editChatNameFailed,
  editChatNameRequest,
  editChatNameSucceed, editMessageFailed,
  editMessageRequest,
  editMessageSucceed, getMessagesFailed, getMessagesRequest,
  getMessagesSucceed,
  getParticipantsFailed,
  getParticipantsRequest,
  getParticipantsSucceed,
  Message,
  sendMessageFailed,
  sendMessageRequest,
  sendMessageSucceed,
} from '@/redux/store/chat/actions';

export const INITIAL_STATE: IUI = {
  ...getInitialState(loadersAndErrorsTypes),
  dialog: {
    isShowLogout: false,
    isShowUserSettings: false,
    isShowCreateChat: false,
    chatSettings: {
      isActive: false,
      chatId: null,
    },
  },
};

export const uiReducer = reducerWithInitialState(INITIAL_STATE)
  .case(setShowChatSettings, setShowChatSettingsHandler)
  .case(setShowUserSettings, setDialogsSettingsHandler(UI.IS_SHOW_USER_SETTINGS))
  .case(setShowCreateChat, setDialogsSettingsHandler(UI.IS_SHOW_CREATE_CHAT))
  .case(setShowLogout, setDialogsSettingsHandler(UI.IS_SHOW_LOGOUT))
  .case(logout, logoutHandler)
  .case(createChatRequest, setLoaderHandler(Chat.CREATE_CHAT, true))
  .case(deleteChatRequest, setLoaderHandler(Chat.DELETE_CHAT, true))
  .case(
    deleteUserFromChatRequest, setLoaderHandler(Chat.DELETE_USER_FROM_CHAT, true,
    ))
  .case(getParticipantsRequest, setLoaderHandler(Chat.GET_CHAT_PARTICIPANTS, true))
  .case(editChatNameRequest, setLoaderHandler(Chat.EDIT_CHAT_NAME, true))
  .case(sendMessageRequest, setLoaderHandler(Message.SEND_MESSAGE, true))
  .case(deleteMessageRequest, setLoaderHandler(Message.DELETE_MESSAGE, true))
  .case(editMessageRequest, setLoaderHandler(Message.EDIT_MESSAGE, true))
  .case(getMessagesRequest, setLoaderHandler(Message.GET_MESSAGES, true))
  .case(addUserToChatRequest, setLoaderHandler(User.ADD_USER_TO_CHAT, true))
  .case(editCurrentUserRequest, setLoaderHandler(User.EDIT_CURRENT_USER, true))
  .case(signInRequest, setLoaderHandler(Auth.SIGN_IN, true))
  .case(signUpRequest, setLoaderHandler(Auth.SIGN_UP, true))
  .case(confirmUserRequest, setLoaderHandler(Auth.CONFIRM_USER, true))
  .case(changePasswordRequest, setLoaderHandler(Auth.CHANGE_PASSWORD, true))
  .case(createChatSucceed, setLoaderHandler(Chat.CREATE_CHAT, false))
  .case(deleteChatSucceed, setLoaderHandler(Chat.DELETE_CHAT, false))
  .case(
    deleteUserFromChatSucceed, setLoaderHandler(Chat.DELETE_USER_FROM_CHAT, false,
    ))
  .case(getParticipantsSucceed, setLoaderHandler(Chat.GET_CHAT_PARTICIPANTS, false))
  .case(editChatNameSucceed, setLoaderHandler(Chat.EDIT_CHAT_NAME, false))
  .case(sendMessageSucceed, setLoaderHandler(Message.SEND_MESSAGE, false))
  .case(deleteMessageSucceed, setLoaderHandler(Message.DELETE_MESSAGE, false))
  .case(editMessageSucceed, setLoaderHandler(Message.EDIT_MESSAGE, false))
  .case(getMessagesSucceed, setLoaderHandler(Message.GET_MESSAGES, false))
  .case(addUserToChatSucceed, setLoaderHandler(User.ADD_USER_TO_CHAT, false))
  .case(editCurrentUserSucceed, setLoaderHandler(User.EDIT_CURRENT_USER, false))
  .case(signInSucceed, setLoaderHandler(Auth.SIGN_IN, false))
  .case(signUpSucceed, setLoaderHandler(Auth.SIGN_UP, false))
  .case(confirmUserSucceed, setLoaderHandler(Auth.CONFIRM_USER, false))
  .case(changePasswordSucceed, setLoaderHandler(Auth.CHANGE_PASSWORD, false))
  .case(createChatRequest, setLoaderHandler(Chat.CREATE_CHAT, true))
  .case(deleteChatFailed, setErrorHandler(Chat.DELETE_CHAT, true))
  .case(
    deleteUserFromChatFailed, setErrorHandler(Chat.DELETE_USER_FROM_CHAT, true))
  .case(getParticipantsFailed, setErrorHandler(Chat.GET_CHAT_PARTICIPANTS, true))
  .case(editChatNameFailed, setErrorHandler(Chat.EDIT_CHAT_NAME, true))
  .case(sendMessageFailed, setErrorHandler(Message.SEND_MESSAGE, true))
  .case(deleteMessageFailed, setErrorHandler(Message.DELETE_MESSAGE, true))
  .case(editMessageFailed, setErrorHandler(Message.EDIT_MESSAGE, true))
  .case(getMessagesFailed, setErrorHandler(Message.GET_MESSAGES, true))
  .case(addUserToChatFailed, setErrorHandler(User.ADD_USER_TO_CHAT, true))
  .case(editCurrentUserFailed, setErrorHandler(User.EDIT_CURRENT_USER, true))
  .case(signInFailed, setErrorHandler(Auth.SIGN_IN, true))
  .case(signUpFailed, setErrorHandler(Auth.SIGN_UP, true))
  .case(confirmUserFailed, setErrorHandler(Auth.CONFIRM_USER, true))
  .case(changePasswordFailed, setErrorHandler(Auth.CHANGE_PASSWORD, true))
  .build();
