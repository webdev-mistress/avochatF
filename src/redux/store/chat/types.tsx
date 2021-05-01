import { IReadableUserResponse } from '@/redux/sagas/utils/types';

export type DeleteUserData = { login: string, chatId: number }
export type EditedMessage = { messageId: number, message: string }

export interface IChatStore {
  activeChatId: number | null,
  selectedChatId: number | null,
  editedMessageInfo: EditedMessage | null,
  chats: IChat[],
}

export interface IAuthor {
  login: string,
  name: string,
  userId: number,
}

export interface IMessage {
  author: IAuthor,
  dateChange: string | null,
  dateCreate: string,
  message: string,
  messageId: number,
}

export interface IChat {
  id: number,
  name: string,
  lastMessage: string,
  userOwnerId: number,
  messages: IMessage[],
  chatMembersList: IMemberInfo[],
}

export type EditedChatInfo = { name: string, id: number };

export interface IMemberInfo {
  id: number,
  name: string,
  login: string,
  isOnline: boolean,
}

export interface IGetParticipantsInfo {
  // chatMembersInfo: IMemberInfo[],
  participantsInfo: IReadableUserResponse,
  chatId: number,
}
