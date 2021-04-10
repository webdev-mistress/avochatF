import camelcase from 'camelcase';
import { ChatSettingsShow, DialogSettingsShow, IUI } from '@/redux/store/ui/types';
import { INITIAL_STATE } from '@/redux/store/ui/reducer';
import { getErrorName, getLoaderName } from '@/redux/utils/redux';

export const setShowChatSettingsHandler = (
  state: IUI,
  payload: ChatSettingsShow,
): IUI => ({
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
  state: IUI,
  payload: DialogSettingsShow,
): IUI => ({
  ...state,
  dialog: {
    ...state.dialog,
    [camelcase(type)]: payload.isActive,
  },
});

export const setLoaderHandler = (loaderType: string, isLoading: boolean) => (
  state: IUI,
): IUI => ({
  ...state,
  loaders: {
    ...state.loaders,
    [getLoaderName(loaderType)]: isLoading,
  },
});

export const setErrorHandler = (
  errorType: string, isError: boolean,
) => (
  state: IUI,
  payload?: string,
):IUI => ({
  ...state,
  errors: {
    ...state.errors,
    [getErrorName(errorType)]: {
      textError: payload,
      isError,
    },
  },
});

export const logoutHandler = (): IUI => INITIAL_STATE;
