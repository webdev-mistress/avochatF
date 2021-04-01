export interface IActiveChat {
  info?: IChat | null,
  editMessageData?: EditMessageData,
  isCreateChatSpin: boolean,
  isActiveChatSpin: boolean,
  isDeleteChatSpin: boolean,
  isGetMessagesSpin: boolean,
  isSendMessageSpin: boolean,
  isDeleteMessageSpin: boolean,
  isEditMessageSpin: boolean,
  isGetParticipantsSpin: boolean,
  isDeleteUserFromChatSpin: boolean,
  editedMessageId?: number,
  editedMessage?: string,
  chatMembersList?: IMembersData[],
}

export type ChatData = { name: string, id: number };
export type DeleteUserData = { login: string, chatId: number }
export type EditMessageData = { messageId: number, message: string }

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
  messages?: IMessage[],
  chatMembersList?: IMembersData[],
}

// export interface IMessageData {
//   editMessageId: number,
//   messageEdit: string,
// }

export interface IChatData {
  login: string,
  selectedChatId: number,
}

export interface IMembersData {
  id: number,
  name: string,
  login: string,
  isOnline?: boolean,
}
