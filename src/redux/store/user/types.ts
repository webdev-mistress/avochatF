import { IChat } from '@/redux/store/chat/types';

export interface IUserProfileData {
  id: number,
  name: string,
  login: string,
  email: string,
  lang?: string,
}

export interface IUserProfileDataWithChats extends IUserProfileData {
  chats: IChat[],
  accessToken: string,
}

export interface IUserStore {
  userProfileData: IUserProfileData | null,
  isAuthUser: boolean,
}

// TODO refactor editUserData
export type EditUserData = {
  name?: string, login?: string, email?: string, lang?: string
}

export interface IChangePasswordData {
  oldPassword: string,
  newPassword: string,
}

export interface ISignInUserData {
  login: string,
  password: string,
}

export interface IChangePasswordData {
  oldPassword: string,
  newPassword: string,
}

export interface IChangeUserData {
  email?: string,
  login?: string,
  name?: string,
  lang?: string,
}
