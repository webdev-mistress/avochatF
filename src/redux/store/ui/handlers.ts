import camelcase from 'camelcase';
import { ChatSettingsShow, DialogSettingsShow, IUIStore } from '@/redux/store/ui/types';
import { INITIAL_STATE } from '@/redux/store/ui/reducer';
import { getErrorName, getLoaderName } from '@/redux/utils/redux';
import { IErrorInfo } from '@/redux/utils/types2';

export const setShowChatSettingsHandler = (
  state: IUIStore,
  payload: ChatSettingsShow,
): IUIStore => ({
  ...state,
  dialog: {
    ...state.dialog,
    chatSettings: {
      isActive: payload.isActive,
      chatId: payload.chatId,
    },
  },
});

export const setDialogsSettingsHandler = (type: string) => (
  state: IUIStore,
  payload: DialogSettingsShow,
): IUIStore => ({
  ...state,
  dialog: {
    ...state.dialog,
    [camelcase(type)]: payload.isActive,
  },
});

export const setLoaderHandler = (loaderType: string, isLoading: boolean) => (
  state: IUIStore,
): IUIStore => ({
  ...state,
  loaders: {
    ...state.loaders,
    [getLoaderName(loaderType)]: isLoading,
  },
});

export const setToggleFailedHandler = (
  state: IUIStore,
  payload: IErrorInfo,
): IUIStore => {
  const {
    errorType,
    textError,
    isError,
  } = payload;
  return ({
    ...state,
    errors: {
      ...state.errors,
      [getErrorName(errorType)]: {
        textError,
        isError,
      },
    },
    loaders: {
      ...state.loaders,
      [getLoaderName(errorType)]: false,
    },
  });
};

export const signUpSucceedHandler = (loaderType: string) => (
  state: IUIStore,
): IUIStore => ({
  ...state,
  loaders: {
    ...state.loaders,
    [getLoaderName(loaderType)]: false,
  },
  toggles: {
    ...state.toggles,
    isRegFinished: true,
  },
});

export const logoutHandler = (): IUIStore => INITIAL_STATE;
