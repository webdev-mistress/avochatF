import camelcase from 'camelcase';
import { ChatSettingsShow, DialogSettingsShow } from '@/redux/store/ui/types';
import { IUI } from '@/types/store/uiActions';

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
