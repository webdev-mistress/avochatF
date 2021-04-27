import { IDialog, IErrors, ILoadings, IToggles } from '@/redux/utils/types';

export interface IUIStore {
  loaders: ILoadings,
  errors: IErrors,
  toggles: IToggles,
  dialog: IDialog,
}

export type ChatSettingsShow = {chatId: null | number, isActive: boolean};
export type DialogSettingsShow = { isActive: boolean };
