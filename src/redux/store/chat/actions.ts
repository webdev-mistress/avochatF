import { getApiActions } from '@/utils/redux';
import actionCreatorFactory from 'typescript-fsa';
import { IChat } from '@/redux/store/chat/types';
const actionCreator = actionCreatorFactory();

export enum Chat {
  CREATE_CHAT = 'CREATE_CHAT',
  DELETE_CHAT = 'DELETE_CHAT',
  GET_ACTIVE_CHAT = 'GET_ACTIVE_CHAT',
  GET_SELECTED_CHAT = 'GET_SELECTED_CHAT',
  CLEAR_CHAT = 'CLEAR_CHAT',
  DELETE_USER_FROM_CHAT = 'DELETE_USER_FROM_CHAT',
  GET_CHAT_PARTICIPANTS = 'GET_CHAT_PARTICIPANTS',
  EDIT_CHAT_NAME = 'EDIT_CHAT_NAME',
}

export enum Message {
  GET_MESSAGES = 'GET_MESSAGES',
  SEND_MESSAGE = 'SEND_MESSAGE',
  DELETE_MESSAGE = 'DELETE_MESSAGE',
  EDIT_MESSAGE = 'EDIT_MESSAGE',
  ERROR_MESSAGE = 'ERROR_MESSAGE',
}

const getActiveChat = actionCreator<IChat>(Chat.GET_ACTIVE_CHAT);
const clearChat = actionCreator(Chat.CLEAR_CHAT);
const getErrorMessageRequest = actionCreator<unknown>(Message.ERROR_MESSAGE);
const getSelectedChat = actionCreator<IChat>(Chat.GET_SELECTED_CHAT);

const [
  createChatRequest,
  createChatSucceed,
  createChatFailed,
] = getApiActions(Chat.CREATE_CHAT);

const [
  deleteChatRequest,
  deleteChatSucceed,
  deleteChatFailed,
] = getApiActions(Chat.DELETE_CHAT);

const [
  deleteUserFromChatRequest,
  deleteUserFromChatSucceed,
  deleteUserFromChatFailed,
] = getApiActions(Chat.DELETE_USER_FROM_CHAT);

const [
  getParticipantsRequest,
  getParticipantsSucceed,
  getParticipantsFailed,
] = getApiActions(Chat.GET_CHAT_PARTICIPANTS);

const [
  editChatNameRequest,
  editChatNameSucceed,
  editChatNameFailed,
] = getApiActions(Chat.EDIT_CHAT_NAME);

const [
  getMessagesRequest,
  getMessagesSucceed,
  getMessagesFailed,
] = getApiActions(Message.GET_MESSAGES);

const [
  sendMessageRequest,
  sendMessageSucceed,
  sendMessageFailed,
] = getApiActions(Message.SEND_MESSAGE);

const [
  deleteMessageRequest,
  deleteMessageSucceed,
  deleteMessageFailed,
] = getApiActions(Message.DELETE_MESSAGE);

const [
  editMessageRequest,
  editMessageSucceed,
  editMessageFailed,
] = getApiActions(Message.EDIT_MESSAGE);

export {
  editChatNameRequest,
  editChatNameSucceed,
  editChatNameFailed,
  getParticipantsRequest,
  getParticipantsSucceed,
  getParticipantsFailed,
  createChatRequest,
  createChatSucceed,
  createChatFailed,
  deleteChatRequest,
  deleteChatSucceed,
  deleteChatFailed,
  deleteUserFromChatRequest,
  deleteUserFromChatSucceed,
  deleteUserFromChatFailed,
  getActiveChat,
  clearChat,
  getMessagesRequest,
  getMessagesSucceed,
  getMessagesFailed,
  sendMessageRequest,
  sendMessageSucceed,
  sendMessageFailed,
  deleteMessageRequest,
  deleteMessageSucceed,
  deleteMessageFailed,
  editMessageRequest,
  editMessageSucceed,
  editMessageFailed,
  getErrorMessageRequest,
  getSelectedChat,
};
