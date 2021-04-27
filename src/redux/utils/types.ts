import { IUserStore } from '@/redux/store/user/types';
import { IChatStore } from '@/redux/store/chat/types';
import { ChatSettingsShow, IUIStore } from '@/redux/store/ui/types';

export interface IError {
  isError: boolean,
  textError: string,
}

export interface IErrorInfo extends IError {
  errorType: string,
}

export interface ILoadings {
  [key: string]: boolean,
}

export interface IErrors {
  [key: string]: IError,
}

export interface IToggles {
  isRegFinished: boolean,
}

export interface IDialog {
  isShowLogout: boolean,
  isShowCreateChat: boolean,
  isShowUserSettings: boolean,
  chatSettings: ChatSettingsShow,
}

export interface ILoadersAndErrors {
  loaders: ILoadings,
  errors: IErrors,
}

export interface IStore {
  user: IUserStore,
  chat: IChatStore,
  ui: IUIStore,
}
