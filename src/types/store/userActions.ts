import { Chat, User } from '@/constants/store';
import {
  IChangedFields,
  IChat,
} from '@/types/store/chatActions';
import {
  ILogoutUser,
  IRemoveErrorMessage, ISignInFailedUser,
  ISignInUserRequest,
  ISignInUserSucceed, ISignUpFailedUser,
  ISignUpRequestUser,
} from '@/types/store/authActions';

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

export type UserActions = IAddNewChat | IDeleteOldChat | IGetSelectedChat | IEditChatName
  | IAddNewChatName | IEditUserData | IEditCurrentUserRequest | IEditCurrentUserSucceed
  | ISignUpRequestUser | ISignInUserRequest | ISignInUserSucceed | IRemoveErrorMessage
  | ISignUpFailedUser | ISignInFailedUser | ILogoutUser;
