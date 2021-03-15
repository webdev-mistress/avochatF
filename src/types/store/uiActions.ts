import { UI } from '@/constants/store';

export interface IUI {
  dialog: {
    isShowLogout: boolean,
    isShowCreateChat: boolean,
    isShowUserSettings: boolean,
    chatSettings: {
      isShowDialog: boolean,
      chatId: number,
    },
  }
}

export interface IIsShowUserSettings {
  type: UI.IS_SHOW_USER_SETTINGS,
  payload: {
    isShow: boolean,
  }
}

export interface IIsShowChatSettings {
  type: UI.IS_SHOW_CHAT_SETTINGS,
  payload: {
    isShowDialog: boolean,
    chatId: number,
  }
}

export interface IIsShowLogout {
  type: UI.IS_SHOW_LOGOUT,
  payload: {
    isShow: boolean,
  }
}

export interface IIsShowCreateChat {
  type: UI.IS_SHOW_CREATE_CHAT,
  payload: {
    isShow: boolean,
  }
}

export type UIActions = IIsShowUserSettings | IIsShowChatSettings | IIsShowLogout
  | IIsShowCreateChat;

