import { IChat } from '@/redux/store/chat/types';

export interface ISucceededUserData {
  userId: number,
  name: string,
  login: string,
  chats: IChat[],
}

export interface IUser {
  isAuth: boolean,
  isAuthSpin: boolean,
  isEditCurrentUser: boolean,
  id: number,
  name: string,
  login: string,
  email: string,
  chats: IChat[],
  userData?: ISucceededUserData,
  errorMessage?: string,
  selectedChat: IChat | null,
}

export type EditUserData = {
  name?: string, login?: string, email?: string, lang?: string
}

// not sure if it is necessary
export interface IChangePasswordData {
  oldPassword: string,
  newPassword: string,
}

// not sure if it is necessary
export interface ISignInUserData {
  login: string,
  password: string,
}

// not sure if it is necessary
export interface IChangePasswordData {
  oldPassword: string,
  newPassword: string,
}

// not sure if it is necessary
export interface IChangeUserData {
  email?: string,
  login?: string,
  name?: string,
  lang?: string,
}
