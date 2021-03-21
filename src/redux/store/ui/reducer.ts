import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { UI } from '@/constants/store';
import {
  setShowChatSettings,
  setShowCreateChat, setShowLogout,
  setShowUserSettings,
} from '@/redux/store/ui/actions';
import {
  setDialogsSettingsHandler,
  setShowChatSettingsHandler,
} from '@/redux/store/ui/handlers';
import { IUI } from '@/types/store/uiActions';

const INITIAL_STATE: IUI = {
  dialog: {
    isShowLogout: false,
    isShowUserSettings: false,
    isShowCreateChat: false,
    chatSettings: {
      isActive: false,
      chatId: null,
    },
  },
};

export const uiReducer = reducerWithInitialState(INITIAL_STATE)
  .case(setShowChatSettings, setShowChatSettingsHandler)
  .case(setShowUserSettings, setDialogsSettingsHandler(UI.IS_SHOW_USER_SETTINGS))
  .case(setShowCreateChat, setDialogsSettingsHandler(UI.IS_SHOW_CREATE_CHAT))
  .case(setShowLogout, setDialogsSettingsHandler(UI.IS_SHOW_LOGOUT))
  .build();
