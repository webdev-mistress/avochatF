import { Chat, User } from '@/constants/store';
import {
  IChangedFields,
  IChat,
} from '@/types/store/chatActions';

export interface IUser {
  isAuth: boolean,
  isAuthSpin: boolean,
  id: number,
  name: string,
  login: string,
  chats: IChat[],
  userData?: ISucceededUserData,
  errorMessage?: string,
  selectedChat: IChat | null,
}

export interface ISucceededUserData {
  userId: number,
  name: string,
  login: string,
  chats: IChat[],
}

export interface IUserData {
  email: string,
  name: string,
  login: string,
  password: string,
}

export interface IRequestUserData {
  login: string,
  password: string,
}

export interface IRequestUser {
  type: User.FETCH_REQUESTED,
  payload: {
    user: IRequestUserData,
  }
}

export interface IRequestConfirm {
  type: User.CONFIRM_REQUESTED,
  payload: {
    token: string,
  }
}

export interface IGetUserSucceeded {
  type: User.FETCH_SUCCEEDED,
  payload: {
    userData: ISucceededUserData,
  }
}

export interface IFailedUser {
  type: User.FETCH_FAILED,
  payload: {
    errorMessage: string,
  }
}

export interface ILogoutUser {
  type: User.LOGOUT,
}

export interface IRemoveErrorMessage {
  type: User.REMOVE_AUTH_ERROR_MESSAGE,
}

export interface IRequestCreateUser {
  type: User.CREATE_REQUESTED,
  payload: {
    userData: IUserData,
  }
}

export interface IEditOldUser {
  type: User.EDIT_OLD_USER,
  payload: IChangedFields,
}

export interface IAddNewUserValue {
  type: User.ADD_NEW_USER_VALUE,
  payload: {
    changedFields: IChangedFields,
  }
}

export interface IAddNewChatName {
  type: Chat.ADD_NEW_CHAT_NAME,
  payload: {
    newChatName: string,
    chatId: number,
  }
}

export interface IDeleteOldChat {
  type: Chat.DELETE_OLD_CHAT,
  payload: {
    chatId: number,
  }
}

export interface IGetSelectedChat {
  type: User.GET_SELECTED_CHAT,
  payload: {
    selectedChat: IChat,
  }
}

export interface IEditChatName {
  type: Chat.EDIT_CHAT_NAME,
  payload: {
    newChatName: string,
    chatId: number,
  }
}

export interface IAddNewChat {
  type: Chat.ADD_NEW_CHAT,
  payload: {
    chat: IChat,
  }
}

export interface IEditUser {
  type: User.EDIT_OLD_USER,
  payload: IChangedFields,
}

export type UserActions = IRequestUser | IGetUserSucceeded | ILogoutUser
  | IRemoveErrorMessage | IRequestCreateUser | IFailedUser | IAddNewChat
  | IDeleteOldChat | IGetSelectedChat | IEditChatName |
  IAddNewChatName | IEditUser | IAddNewUserValue | IRequestConfirm;
