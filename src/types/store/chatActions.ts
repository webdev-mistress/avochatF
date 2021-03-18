import { Chat, User } from '@/constants/store';
import { IEditMessage, IGetMessages } from '@/types/store/messageActions';
import { ILogoutUser } from '@/types/store/authActions';

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

export interface IActiveChat {
  info?: IChat,
  messageData?: IMessageData,
  isCreateChatSpin: boolean,
  isActiveChatSpin: boolean,
  editMessageId?: number,
  messageEdit?: string,
  chatMembersList?: IMembersData[],
}

export interface IChat {
  id: number,
  name: string,
  lastMessage: string,
  userOwnerId: number,
  messages?: IMessage[],
  chatMembersList?: IMembersData[],
}

export interface IMessageData {
  editMessageId: number,
  messageEdit: string,
}

export interface IChatData {
  login: string,
  selectedChatId: number,
}

export interface IGetActiveChat {
  type: Chat.GET_ACTIVE_CHAT,
  payload: IChat,
}

export interface IClearChat {
  type: Chat.CLEAR_CHAT,
}

export interface ICreateChat {
  type: Chat.CREATE_CHAT,
  payload: {
    chatName: string,
  }
}

export interface IDeleteChat {
  type: Chat.DELETE_CHAT,
  payload: {
    chatId: number,
  }
}

export interface IDeleteUserFromChat {
  type: Chat.DELETE_USER_FROM_CHAT,
  payload: {
    login: string,
    chatId: number,
  }
}

export interface IAddUserToChat {
  type: User.ADD_USER_TO_CHAT,
  payload: {
    chatData: IChatData,
  }
}

export interface IAddNewChat {
  type: Chat.ADD_NEW_CHAT,
  payload: {
    chat: IChat,
  }
}

export interface IDeleteUnwanterUser {
  type: Chat.DELETE_UNWANTED_USER,
  payload: {
    login: string,
    chatId: number,
  }
}

export interface ICheckMembers {
  type: Chat.GET_CHAT_PARTICIPANTS,
  payload: {
    chatId: number,
  }
}

export interface ICheckMembersLoad {
  type: Chat.GET_CHAT_PARTICIPANTS_LOADED,
  payload: {
    data: IMembersData[],
  }
}

export interface IMembersData {
  id: number,
  name: string,
  login: string,
  isOnline?: boolean,
}

export interface IEditChatName {
  type: Chat.EDIT_CHAT_NAME,
  payload: {
    name: string,
    id: number,
  }
}

export interface IAddNewChatName {
  type: Chat.ADD_NEW_CHAT_NAME,
  payload: {
    name: string,
    id: number,
  }
}

export type ChatActions = IGetActiveChat | IClearChat | ICreateChat | IAddNewChat
  | ICheckMembersLoad | IDeleteUserFromChat | IDeleteUnwanterUser | IEditChatName
  | IAddNewChatName | IGetMessages | IEditMessage | ILogoutUser;
