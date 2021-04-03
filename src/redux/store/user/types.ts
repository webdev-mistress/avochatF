import { IChat } from '@/redux/store/chat/types';

export interface ISucceededUserData {
  userId: number,
  name: string,
  login: string,
  chats: IChat[],
}

// export interface IUser {

// for ui reducer
//   isAuthSpin: boolean,
//   isEditCurrentUser: boolean,
//   errorMessage?: string, => will change to errorMessage: string | null

// for user reducer => done
//   id: number,
//   name: string,
//   login: string,
//   email: string,
//   isAuth: boolean,

// for chat reducer
//   chats: IChat[],
// duplicate Active chat
//   selectedChat: IChat | null,

// duplicate strings (userProfileData now) => done
//   userData?: ISucceededUserData,
// }

export interface IUserProfileData {
  id: number,
  name: string,
  login: string,
  email: string,
  lang?: string,
}

export interface IUser {
  userProfileData: IUserProfileData | null,
  isAuthUser: boolean,
}

// TODO refactor editUserData
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
