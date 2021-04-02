import camelcase from 'camelcase';
import { ChatSettingsShow, DialogSettingsShow, IUI } from '@/redux/store/ui/types';
import { INITIAL_STATE } from '@/redux/store/ui/reducer';

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

export const logoutHandler = (): IUI => INITIAL_STATE;
