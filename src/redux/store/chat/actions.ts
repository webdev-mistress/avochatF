import { Chat, Message } from '@/constants/store';
import {
  IAddNewChatName,
  IChat,
  ICheckMembers, ICheckMembersLoad,
  IClearChat,
  ICreateChat,
  IDeleteChat,
  IDeleteUnwanterUser,
  IDeleteUserFromChat,
  IEditChatName,
  IGetActiveChat,
  IMembersData,
  IMessage,
  IMessageData,
} from '@/types/store/chatActions';
import {
  IDeleteMessage, IDeleteMessageFailed, IEditMessage,
  IErrorMessages,
  IGetMessages,
  IRequestMessages, ISendMessage, ISendMessageFailed,
} from '@/types/store/messageActions';

export function getMessages(messages: IMessage[]): IGetMessages {
  return {
    type: Message.MESSAGES_SUCCEEDED, payload: messages,
  };
}

export function requestMessages(chatId: number): IRequestMessages {
  return {
    type: Message.MESSAGES_REQUESTED, payload: { chatId },
  };
}

export function errorMessages(errorMessage: any): IErrorMessages {
  return {
    type: Message.MESSAGES_FAILED, payload: { errorMessage },
  };
}

export function sendMessage(messageText: string): ISendMessage {
  return {
    type: Message.SEND_MESSAGE, payload: { messageText },
  };
}

export function sendMessageFailed(errorMessage: any): ISendMessageFailed {
  return {
    type: Message.SEND_MESSAGE_FAILED, payload: { errorMessage },
  };
}

export function deleteMessage(messageId: number): IDeleteMessage {
  return {
    type: Message.DELETE_MESSAGE, payload: { messageId },
  };
}

export function deleteMessageFailed(errorMessage: any): IDeleteMessageFailed {
  return {
    type: Message.DELETE_MESSAGE_FAILED, payload: { errorMessage },
  };
}

export function getActiveChat(activeChat: IChat): IGetActiveChat {
  return {
    type: Chat.GET_ACTIVE_CHAT, payload: activeChat,
  };
}

export function clearChat(): IClearChat {
  return {
    type: Chat.CLEAR_CHAT,
  };
}

export function editMessage(messageData: IMessageData): IEditMessage {
  return {
    type: Message.EDIT_MESSAGE, payload: { messageData },
  };
}

export function createChat(chatName: string): ICreateChat {
  return {
    type: Chat.CREATE_CHAT, payload: { chatName },
  };
}

export function deleteChat(chatId: number): IDeleteChat {
  return {
    type: Chat.DELETE_CHAT, payload: { chatId },
  };
}

export function deleteUserFromChat(login: string, chatId: number): IDeleteUserFromChat {
  return {
    type: Chat.DELETE_USER_FROM_CHAT, payload: { login, chatId },
  };
}

export function getChatParticipants(chatId: number): ICheckMembers {
  return {
    type: Chat.GET_CHAT_PARTICIPANTS, payload: { chatId },
  };
}

export function checkMembersLoaded(data: IMembersData[]): ICheckMembersLoad {
  return {
    type: Chat.GET_CHAT_PARTICIPANTS_LOADED,
    payload: {
      data: data,
    },
  };
}

export function deleteUnwanterUser(login: string, chatId: number): IDeleteUnwanterUser {
  return {
    type: Chat.DELETE_UNWANTED_USER, payload: { login, chatId },
  };
}

export function editOldChatName(name: string, id: number): IEditChatName {
  return {
    type: Chat.EDIT_CHAT_NAME,
    payload: {
      name,
      id,
    },
  };
}

export function addNewChatName(name: string, id: number): IAddNewChatName {
  return {
    type: Chat.ADD_NEW_CHAT_NAME, payload: { name, id },
  };
}
