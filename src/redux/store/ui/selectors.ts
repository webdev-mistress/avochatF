import { IStore } from '@/redux/utils/types';

export const selectIsShowChatSettings = (state: IStore): boolean =>
  state.ui.dialog.chatSettings.isActive;

export const selectIsShowUserSettings = (state: IStore): boolean =>
  state.ui.dialog.isShowUserSettings;

export const selectIsShowLogout = (state: IStore): boolean =>
  state.ui.dialog.isShowLogout;

export const selectIsShowCreateChat = (state: IStore): boolean =>
  state.ui.dialog.isShowCreateChat;
