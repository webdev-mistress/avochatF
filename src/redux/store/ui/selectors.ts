import { IError, IErrors, IStore } from '@/redux/utils/types';
import { getErrorName, getLoaderName } from '@/redux/utils/redux';

export const selectIsShowChatSettings = (state: IStore): boolean =>
  state.ui.dialog.chatSettings.isActive;

export const selectIsShowUserSettings = (state: IStore): boolean =>
  state.ui.dialog.isShowUserSettings;

export const selectIsShowLogout = (state: IStore): boolean =>
  state.ui.dialog.isShowLogout;

export const selectIsShowCreateChat = (state: IStore): boolean =>
  state.ui.dialog.isShowCreateChat;

export const selectLoaderStatus = (type: string) => (state: IStore): boolean => {
  const loaderName = getLoaderName(type);
  return state.ui.loaders[loaderName];
};

export const selectError = (type: string) => (
  state: IStore): IError => {
  const errorName = getErrorName(type);
  return state.ui.errors[errorName];
};

export const selectErrorInfo = (state: IStore): IErrors => state.ui.errors;

export const selectIsRegFinished = (state: IStore): boolean =>
  state.ui.toggles.isRegFinished;
