import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
  setShowChatSettings,
  setShowCreateChat, setShowLogout,
  setShowUserSettings, setToggleFailed, UI,
} from '@/redux/store/ui/actions';
import {
  logoutHandler,
  setDialogsSettingsHandler, setLoaderHandler,
  setShowChatSettingsHandler, setToggleFailedHandler, signUpSucceedHandler,
} from '@/redux/store/ui/handlers';
import {
  addUserToChatRequest,
  addUserToChatSucceed,
  Auth,
  changePasswordRequest, changePasswordSucceed,
  confirmUserRequest, confirmUserSucceed,
  editCurrentUserRequest, editCurrentUserSucceed,
  logout,
  signInRequest, signInSucceed,
  signUpRequest, signUpSucceed,
  User,
} from '@/redux/store/user/actions';
import { getInitialState, loadersAndErrorsTypes } from '@/redux/utils/redux';
import {
  Chat,
  createChatRequest,
  createChatSucceed,
  deleteChatRequest,
  deleteChatSucceed,
  deleteMessageRequest,
  deleteMessageSucceed,
  deleteUserFromChatRequest,
  deleteUserFromChatSucceed,
  editChatNameRequest,
  editChatNameSucceed,
  editMessageRequest,
  editMessageSucceed,
  getMessagesRequest,
  getMessagesSucceed,
  getParticipantsRequest,
  getParticipantsSucceed,
  Message,
  sendMessageRequest,
  sendMessageSucceed,
} from '@/redux/store/chat/actions';
import { IUIStore } from '@/redux/store/ui/types';

export const INITIAL_STATE: IUIStore = {
  ...getInitialState(loadersAndErrorsTypes),
  toggles: {
    isRegFinished: false,
  },
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
  .case(signUpSucceed, signUpSucceedHandler(Auth.SIGN_UP))
  .case(confirmUserSucceed, setLoaderHandler(Auth.CONFIRM_USER, false))
  .case(changePasswordSucceed, setLoaderHandler(Auth.CHANGE_PASSWORD, false))
  .case(createChatRequest, setLoaderHandler(Chat.CREATE_CHAT, true))
  .case(setToggleFailed, setToggleFailedHandler)
  .build();
