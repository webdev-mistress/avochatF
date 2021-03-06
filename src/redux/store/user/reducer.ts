import _ from 'lodash';
import { User, Chat } from '@/constants/store';
import { IUser, UserActions } from '@/types/store/userActions';

const initialState: IUser = {
  id: 0,
  name: '',
  login: '',
  isAuth: false,
  isAuthSpin: false,
  chats: [],
  selectedChat: null,
  errorMessage: '',
};

export function userReducer(state = initialState, action: UserActions): IUser {
  const cloneState = _.cloneDeep(state);

  switch (action.type) {
  case User.SIGN_IN_REQUEST:
  case User.SIGN_UP_REQUEST:
    return {
      ...state,
      isAuthSpin: true,
    };
  case User.SIGN_IN_SUCCEED:
    return {
      ...cloneState,
      ...action.payload.userData,
      isAuth: true,
      isAuthSpin: false,
    };
  case User.REMOVE_AUTH_ERROR_MESSAGE:
    delete cloneState.errorMessage;

    return cloneState;
  case User.SIGN_IN_FAILED:
  case User.SIGN_UP_FAILED:
    return {
      ...state,
      isAuth: false,
      isAuthSpin: false,
      errorMessage: action.payload.errorMessage,
    };
  case Chat.ADD_NEW_CHAT:
    const { chat } = action.payload;

    return {
      ...state,
      chats: [...state.chats, chat],
    };
  case Chat.DELETE_OLD_CHAT:
    const { chatId } = action.payload;

    return {
      ...state,
      chats: state.chats.filter(chat => chat.id !== chatId),
    };
  case User.LOGOUT:
    return initialState;
  case User.GET_SELECTED_CHAT:
    return {
      ...state,
      selectedChat: action.payload.selectedChat,
    };
  case Chat.EDIT_CHAT_NAME:
    return {
      ...state,
      selectedChat: state.selectedChat ? {
        ...state.selectedChat,
        name: action.payload.name,
      } : null,
    };
  case Chat.ADD_NEW_CHAT_NAME: {
    const newChats = state.chats
      .map(chat => chat.id === action.payload.id
        ? { ...chat, name: action.payload.name }
        : chat);
    return {
      ...state,
      chats: newChats,
    };
  }
  case User.EDIT_CURRENT_USER_SUCCEED:
    return {
      ...state,
      ...action.payload.changedFields,
    };
  default:
    return state;
  }
}
