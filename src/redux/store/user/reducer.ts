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
  case User.FETCH_REQUESTED:
  case User.CREATE_REQUESTED:
    return {
      ...state,
      isAuthSpin: true,
    };
  case User.FETCH_SUCCEEDED:
    return {
      ...cloneState,
      ...action.payload.userData,
      isAuth: true,
      isAuthSpin: false,
    };
  case User.REMOVE_AUTH_ERROR_MESSAGE:
    delete cloneState.errorMessage;

    return cloneState;
  case User.FETCH_FAILED:
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
        name: action.payload.newChatName,
      } : null,
    };
  case Chat.ADD_NEW_CHAT_NAME: {
    const newChats = state.chats
      .map(chat => chat.id === action.payload.chatId
        ? { ...chat, name: action.payload.newChatName }
        : chat);

    return {
      ...state,
      chats: newChats,
    };
  }
  case User.ADD_NEW_USER_VALUE:
    return {
      ...state,
      ...action.payload.changedFields,
    };
  default:
    return state;
  }
}
