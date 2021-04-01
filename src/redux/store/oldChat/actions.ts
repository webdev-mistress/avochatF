export const a = 10;
// import { Message } from '@/constants/store';
// import {
// IAddNewChatName,
// IChat,
// ICheckMembers, ICheckMembersLoad,
// IClearChat,
// ICreateChat,
// IDeleteChat,
// IDeleteUnwanterUser,
// IDeleteUserFromChat,
// IEditChatName,
// IGetActiveChat,
// IMembersData,
// IMessage,
// IMessageData,
// } from '@/types/store/chatActions';
// import {
// IDeleteMessage,
// IDeleteMessageFailed,
// IEditMessage,
// IErrorMessages,
// IGetMessages,
// IRequestMessages,
// ISendMessage,
//   ISendMessageFailed,
// } from '@/types/store/messageActions';

// export function getMessages(messages: IMessage[]): IGetMessages { // getMessagesSucceed
//   return {
//     type: Message.MESSAGES_SUCCEEDED, payload: messages,
//   };
// }

// export function requestMessages(chatId: number): IRequestMessages { // getMessagesRequest
//   return {
//     type: Message.MESSAGES_REQUESTED, payload: { chatId },
//   };
// }

// export function errorMessages(errorMessage: any): IErrorMessages {
//   // getErrorMessageRequest
//   return {
//     type: Message.MESSAGES_FAILED, payload: { errorMessage },
//   };
// }

// export function sendMessage(messageText: string): ISendMessage {
//   // sendMessageRequest
//   return {
//     type: Message.SEND_MESSAGE, payload: { messageText },
//   };
// }
//
// export function sendMessageFailed(errorMessage: any): ISendMessageFailed {
//   // sendMessageFailed
//   return {
//     type: Message.SEND_MESSAGE_FAILED, payload: { errorMessage },
//   };
// }

// export function deleteMessage(messageId: number): IDeleteMessage {
//   // deleteMessageRequest
//   return {
//     type: Message.DELETE_MESSAGE, payload: { messageId },
//   };
// }

// export function deleteMessageFailed(errorMessage: any): IDeleteMessageFailed {
//   // deleteMessageFailed
//   return {
//     type: Message.DELETE_MESSAGE_FAILED, payload: { errorMessage },
//   };
// }
//
// export function getActiveChat(activeChat: IChat): IGetActiveChat { // getActiveChat
//   return {
//     type: Chat.GET_ACTIVE_CHAT, payload: activeChat,
//   };
// }

// export function clearChat(): IClearChat { // clearChat
//   return {
//     type: Chat.CLEAR_CHAT,
//   };
// }
//
// export function editMessage(messageData: IMessageData): IEditMessage { // editMessageRequest?
//   return {
//     type: Message.EDIT_MESSAGE, payload: { messageData },
//   };
// }
//
// export function createChat(chatName: string): ICreateChat { // createChatRequest
//   return {
//     type: Chat.CREATE_CHAT, payload: { chatName },
//   };
// }

// export function deleteChat(chatId: number): IDeleteChat { // deleteChatRequest
//   return {
//     type: Chat.DELETE_CHAT, payload: { chatId },
//   };
// }

// export function deleteUserFromChat(login: string, chatId: number): IDeleteUserFromChat {
//   // deleteUserFromChatRequest
//   return {
//     type: Chat.DELETE_USER_FROM_CHAT, payload: { login, chatId },
//   };
// }

// export function getChatParticipants(chatId: number): ICheckMembers {
//   // getParticipantsRequest
//   return {
//     type: Chat.GET_CHAT_PARTICIPANTS, payload: { chatId },
//   };
// }
//
// export function checkMembersLoaded(data: IMembersData[]): ICheckMembersLoad {
//   // getParticipantsSucceed
//   return {
//     type: Chat.GET_CHAT_PARTICIPANTS_LOADED,
//     payload: {
//       data: data,
//     },
//   };
// }

// export function deleteUnwanterUser(login: string, chatId: number): IDeleteUnwanterUser {
//   // deleteUserFromChatSucceed
//   return {
//     type: Chat.DELETE_UNWANTED_USER, payload: { login, chatId },
//   };
// }

// export function editOldChatName(name: string, id: number): IEditChatName { //editChatNameRequest
//   return {
//     type: Chat.EDIT_CHAT_NAME,
//     payload: {
//       name,
//       id,
//     },
//   };
// }
//
// export function addNewChatName(name: string, id: number): IAddNewChatName { // editChatNameSucceed
//   return {
//     type: Chat.ADD_NEW_CHAT_NAME, payload: { name, id },
//   };
// }
