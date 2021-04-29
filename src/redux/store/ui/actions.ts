import actionCreatorFactory from 'typescript-fsa';
import { ChatSettingsShow, DialogSettingsShow } from '@/redux/store/ui/types';
const actionCreator = actionCreatorFactory();

export enum UI {
  IS_SHOW_USER_SETTINGS = 'IS_SHOW_USER_SETTINGS',
  IS_SHOW_CHAT_SETTINGS = 'IS_SHOW_CHAT_SETTINGS',
  IS_SHOW_LOGOUT = 'IS_SHOW_LOGOUT',
  IS_SHOW_CREATE_CHAT = 'IS_SHOW_CREATE_CHAT',
}

const setShowUserSettings = actionCreator<DialogSettingsShow>(UI.IS_SHOW_USER_SETTINGS);
const setShowChatSettings = actionCreator<ChatSettingsShow>(UI.IS_SHOW_CHAT_SETTINGS);
const setShowLogout = actionCreator<DialogSettingsShow>(UI.IS_SHOW_LOGOUT);
const setShowCreateChat = actionCreator<DialogSettingsShow>(UI.IS_SHOW_CREATE_CHAT);

export {
  setShowChatSettings,
  setShowUserSettings,
  setShowCreateChat,
  setShowLogout,
};
