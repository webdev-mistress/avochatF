export interface IUI {
  dialog: {
    isShowLogout: boolean,
    isShowCreateChat: boolean,
    isShowUserSettings: boolean,
    chatSettings: ChatSettingsShow
  }
}

export type ChatSettingsShow = {chatId: null | number, isActive: boolean};
export type DialogSettingsShow = { isActive: boolean };
