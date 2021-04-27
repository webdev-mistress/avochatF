import actionCreatorFactory from 'typescript-fsa';
import { ChatSettingsShow, DialogSettingsShow } from '@/redux/store/ui/types';
import { IErrorInfo } from '@/redux/utils/types';
const actionCreator = actionCreatorFactory();

export enum UI {
  IS_SHOW_USER_SETTINGS = 'IS_SHOW_USER_SETTINGS',
  IS_SHOW_CHAT_SETTINGS = 'IS_SHOW_CHAT_SETTINGS',
  IS_SHOW_LOGOUT = 'IS_SHOW_LOGOUT',
  IS_SHOW_CREATE_CHAT = 'IS_SHOW_CREATE_CHAT',
  API_FAILED = 'API_FAILED',
}

const setShowUserSettings = actionCreator<DialogSettingsShow>(UI.IS_SHOW_USER_SETTINGS);
const setShowChatSettings = actionCreator<ChatSettingsShow>(UI.IS_SHOW_CHAT_SETTINGS);
const setShowLogout = actionCreator<DialogSettingsShow>(UI.IS_SHOW_LOGOUT);
const setShowCreateChat = actionCreator<DialogSettingsShow>(UI.IS_SHOW_CREATE_CHAT);
const setToggleFailed = actionCreator<IErrorInfo>(UI.API_FAILED);

export {
  setShowChatSettings,
  setShowUserSettings,
  setShowCreateChat,
  setShowLogout,
  setToggleFailed,
};
