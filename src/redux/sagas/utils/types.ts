// import { IMemberInfo, IMessage } from '@/redux/store/chat/types';

export interface IChat {
  id: number,
  name: string,
  userOwnerId: number,
}

// export interface IChat {
//   id: number,
//   name: string,
//   lastMessage: string,
//   userOwnerId: number,
//   messages: IMessage[],
//   chatMembersList: IMemberInfo[],
// }


export interface IReadableUser {
  id: number
  login: string,
  email?: string;
  status?: string;
  name: string;
  roles?: string;
  chats?: IChat[],
  accessToken?: string;
  refreshToken?: string;
  socketClientId?: string,
  isOnline: boolean,
}

// export interface IMemberInfo {
//   id: number,
//   name: string,
//   login: string,
//   isOnline: boolean,
// }

export interface IReadableUserResponse {
  usersList: IReadableUser[],
}
