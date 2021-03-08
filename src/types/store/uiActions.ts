import { UI } from '@/constants/store';

export interface IUI {
  dialog: {
    isShowLogout: boolean,
    isShowChatSettings: boolean,
    isShowUserSettings: boolean,
  }
}

export interface IIsShowUserSettings {
  type: UI.IS_SHOW_USER_SETTINFGS,
  payload: {
    isShow: boolean,
  }
}

export interface IIsShowChatSettings {
  type: UI.IS_SHOW_CHAT_SETTINGS,
  payload: {
    isShow: boolean,
  }
}

export interface IIsShowLogout {
  type: UI.IS_SHOW_LOGOUT,
  payload: {
    isShow: boolean,
  }
}

export type UIActions = IIsShowUserSettings | IIsShowChatSettings | IIsShowLogout;
