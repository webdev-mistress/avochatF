import { UI } from '@/constants/store';
import {
  IIsShowChatSettings,
  IIsShowLogout,
  IIsShowUserSettings,
} from '@/types/store/uiActions';

export function setIsShowUserSettings(isShow: boolean): IIsShowUserSettings {
  return {
    type: UI.IS_SHOW_USER_SETTINFGS,
    payload: { isShow },
  };
}

export function setIsShowChatSettings(isShow: boolean): IIsShowChatSettings {
  return {
    type: UI.IS_SHOW_CHAT_SETTINGS, payload: { isShow },
  };
}

export function setIsShowLogout(isShow: boolean): IIsShowLogout {
  return {
    type: UI.IS_SHOW_LOGOUT, payload: { isShow },
  };
}
