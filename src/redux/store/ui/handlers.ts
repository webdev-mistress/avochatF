import camelcase from 'camelcase';
import { ChatSettingsShow, DialogSettingsShow, IUIStore } from '@/redux/store/ui/types';
import { INITIAL_STATE } from '@/redux/store/ui/reducer';
import { getErrorName, getLoaderName } from '@/redux/utils/redux';

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

export const setErrorHandler = (
  errorType: string, isError: boolean,
) => (
  state: IUIStore,
  payload?: string,
):IUIStore => ({
  ...state,
  errors: {
    ...state.errors,
    [getErrorName(errorType)]: {
      textError: payload,
      isError,
    },
  },
});

export const logoutHandler = (): IUIStore => INITIAL_STATE;
