export type DeleteUserData = { login: string, chatId: number }
export type EditedMessage = { messageId: number, message: string }

export interface IChatStore {
  activeChatInfo: IChat | null,
  editedMessageInfo: EditedMessage | null,
  chatMembersList: IMemberInfo[],
  chats: IChat[],
  selectedChat: IChat | null,
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
