import { UI } from '@/constants/store';
import { IUI, UIActions } from '@/types/store/uiActions';

const initialState: IUI = {
  dialog: {
    isShowLogout: false,
    isShowChatSettings: false,
    isShowUserSettings: false,
  },
};

export function uiReducer(state = initialState, action: UIActions): IUI {
  switch(action.type) {
  case UI.IS_SHOW_USER_SETTINFGS:
    return {
      ...state,
      dialog: {
        ...state.dialog,
        isShowUserSettings: action.payload.isShow,
      },
    };
  case UI.IS_SHOW_CHAT_SETTINGS:
    return {
      ...state,
      dialog: {
        ...state.dialog,
        isShowChatSettings: action.payload.isShow,
      },
    };
  case UI.IS_SHOW_LOGOUT:
    return {
      ...state,
      dialog: {
        ...state.dialog,
        isShowLogout: action.payload.isShow,
      },
    };
  default:
    return state;
  }
}
