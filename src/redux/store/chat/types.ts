// export interface IActiveChat {
//   info?: IChat | null, => activeChatInfo
//   editMessageData?: EditMessageData, => editedMessageData

//   editedMessageId?: number, => delete (messageId in editedMessageData)
//   editedMessage?: string, => delete (message in editedMessageData)
//   chatMembersList?: IMembersData[], => the same

// for uiStore in uiReducer
//   isCreateChatSpin: boolean,
//   isActiveChatSpin: boolean,
//   isDeleteChatSpin: boolean,
//   isGetMessagesSpin: boolean,
//   isSendMessageSpin: boolean,
//   isDeleteMessageSpin: boolean,
//   isEditMessageSpin: boolean,
//   isGetParticipantsSpin: boolean,
//   isDeleteUserFromChatSpin: boolean,
// }

// export type ChatData = { name: string, chatId: number };
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

// changed to the type EditedMessageData
// export interface IMessageData {
//   editMessageId: number,
//   messageEdit: string,
// }

// as I see we don't need it anymore (ha-ha)
export type EditedChatInfo = { name: string, id: number };

export interface IMemberInfo {
  id: number,
  name: string,
  login: string,
  isOnline: boolean,
}
