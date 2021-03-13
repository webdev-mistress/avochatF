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

export interface ISignInUserData {
  login: string,
  password: string,
}

export interface ISignInUserRequest {
  type: User.SIGN_IN_REQUEST,
  payload: {
    user: ISignInUserData,
  }
}

export interface IRequestConfirm {
  type: User.CONFIRM_USER_REQUEST,
  payload: {
    token: string,
  }
}

export interface ISignInUserSucceed {
  type: User.SIGN_IN_SUCCEED,
  payload: {
    userData: ISucceededUserData,
  }
}

export interface ISignInFailedUser {
  type: User.SIGN_IN_FAILED,
  payload: {
    errorMessage: string,
  }
}

export interface ISignUpFailedUser {
  type: User.SIGN_UP_FAILED,
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

export interface ISignUpRequestUser {
  type: User.SIGN_UP_REQUEST,
  payload: {
    userData: IUserData,
  }
}

export interface IEditCurrentUserRequest {
  type: User.EDIT_CURRENT_USER_REQUEST,
  payload: IChangedFields,
}

export interface IEditCurrentUserSucceed {
  type: User.EDIT_CURRENT_USER_SUCCEED,
  payload: {
    changedFields: IChangedFields,
  }
}

export interface IAddNewChatName {
  type: Chat.ADD_NEW_CHAT_NAME,
  payload: {
    name: string,
    id: number,
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
    name: string,
    id: number,
  }
}

export interface IAddNewChat {
  type: Chat.ADD_NEW_CHAT,
  payload: {
    chat: IChat,
  }
}

export interface IEditUserData {
  type: User.EDIT_CURRENT_USER_REQUEST,
  payload: IChangedFields,
}

export type UserActions = ISignInUserRequest | ISignInUserSucceed | ILogoutUser
  | IRemoveErrorMessage | ISignUpRequestUser | ISignInFailedUser | IAddNewChat
  | IDeleteOldChat | IGetSelectedChat | IEditChatName |
  IAddNewChatName | IEditUserData | IEditCurrentUserRequest | IRequestConfirm
  | IEditCurrentUserSucceed | ISignUpFailedUser;
