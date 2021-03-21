// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { UI, Auth } from '@/constants/store';
import { IUI, UIActions } from '@/types/store/uiActions';

const initialState: IUI = {
  dialog: {
    isShowLogout: false,
    isShowUserSettings: false,
    isShowCreateChat: false,
    chatSettings: {
      isShowDialog: false,
      chatId: 0,
    },
  },
};

export function uiReducer(state = initialState, action: UIActions): IUI {
  switch(action.type) {
  case UI.IS_SHOW_USER_SETTINGS:
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
        chatSettings: {
          isShowDialog: action.payload.isShowDialog,
          chatId: action.payload.chatId,
        },
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
  case UI.IS_SHOW_CREATE_CHAT:
    return {
      ...state,
      dialog: {
        ...state.dialog,
        isShowCreateChat: action.payload.isShow,
      },
    };
  case Auth.LOGOUT:
    return initialState;
  default:
    return state;
  }
}
