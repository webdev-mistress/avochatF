import { EditUserData, ISucceededUserData, IUser } from '@/redux/store/user/types';
import { ChatData, IChat } from '@/redux/store/chat/types';
import { INITIAL_STATE } from '@/redux/store/user/reducer';

export const deleteChatSucceedHandler = (
  state: IUser,
  chatId: number,
): IUser => ({
  ...state,
  chats: state.chats.filter(chat => chat.id !== chatId),
});

export const createChatSucceedHandler = (
  state: IUser,
  chat: IChat,
): IUser => ({
  ...state,
  chats: [
    ...state.chats,
    chat,
  ],
});

export const editChatNameRequestHandler = (
  state: IUser,
  chatData: ChatData,
): IUser => ({
  ...state,
  selectedChat: state.selectedChat ? {
    ...state.selectedChat,
    name: chatData.name,
  } : null,
});

export const editChatNameSucceedHandler = (
  state: IUser,
  chatData: ChatData,
): IUser => {
  const newChatList = state.chats
    .map((chat) => chat.id === chatData.id
      ? { ...chat, name: chatData.name }
      : chat);
  return ({
    ...state,
    selectedChat: state.selectedChat ? {
      ...state.selectedChat,
      ...chatData,
    } : null,
    chats: newChatList,
  });
};

export const getSelectedChatHandler = (
  state: IUser,
  selectedChat: IChat,
): IUser => ({
  ...state,
  selectedChat: selectedChat,
});

export const logoutHandler = (): IUser => INITIAL_STATE;

export const editCurrentUserRequestHandler = (
  state: IUser,
): IUser => ({
  ...state,
  isEditCurrentUser: true,
});

export const editCurrentUserSucceedHandler = (
  state: IUser,
  editUserData: EditUserData,
): IUser => ({
  ...state,
  ...editUserData,
});

export const signAllRequestHandler = (
  state: IUser,
): IUser => ({
  ...state,
  isAuthSpin: true,
});

export const signInSucceedHandler = (
  state: IUser,
  userData: ISucceededUserData,
): IUser => ({
  ...state,
  ...userData,
  isAuth: true,
  isAuthSpin: false,
});

export const removeAuthErrorMessageHandler = (
  state: IUser,
): IUser => ({
  ...state,
  errorMessage: '',
});

export const signAllFailedHandler = (
  state: IUser,
  errorMessage: string,
): IUser => ({
  ...state,
  isAuth: false,
  isAuthSpin: false,
  errorMessage: errorMessage,
});
