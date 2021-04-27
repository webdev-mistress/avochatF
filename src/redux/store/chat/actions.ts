import { getApiActions } from '@/utils/redux';
import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory();

export enum Chat {
  CREATE_CHAT = 'CREATE_CHAT',
  DELETE_CHAT = 'DELETE_CHAT',
  GET_ACTIVE_CHAT = 'GET_ACTIVE_CHAT',
  GET_SELECTED_CHAT_ID = 'GET_SELECTED_CHAT_ID',
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
}

const getActiveChatId = actionCreator<number>(Chat.GET_ACTIVE_CHAT);
const clearChat = actionCreator(Chat.CLEAR_CHAT);
const getSelectedChatId = actionCreator<number | null>(Chat.GET_SELECTED_CHAT_ID);

const [
  createChatRequest,
  createChatSucceed,
] = getApiActions(Chat.CREATE_CHAT);

const [
  deleteChatRequest,
  deleteChatSucceed,
] = getApiActions(Chat.DELETE_CHAT);

const [
  deleteUserFromChatRequest,
  deleteUserFromChatSucceed,
] = getApiActions(Chat.DELETE_USER_FROM_CHAT);

const [
  getParticipantsRequest,
  getParticipantsSucceed,
] = getApiActions(Chat.GET_CHAT_PARTICIPANTS);

const [
  editChatNameRequest,
  editChatNameSucceed,
] = getApiActions(Chat.EDIT_CHAT_NAME);

const [
  getMessagesRequest,
  getMessagesSucceed,
] = getApiActions(Message.GET_MESSAGES);

const [
  sendMessageRequest,
  sendMessageSucceed,
] = getApiActions(Message.SEND_MESSAGE);

const [
  deleteMessageRequest,
  deleteMessageSucceed,
] = getApiActions(Message.DELETE_MESSAGE);

const [
  editMessageRequest,
  editMessageSucceed,
] = getApiActions(Message.EDIT_MESSAGE);

export {
  editChatNameRequest,
  editChatNameSucceed,
  getParticipantsRequest,
  getParticipantsSucceed,
  createChatRequest,
  createChatSucceed,
  deleteChatRequest,
  deleteChatSucceed,
  deleteUserFromChatRequest,
  deleteUserFromChatSucceed,
  getActiveChatId,
  clearChat,
  getMessagesRequest,
  getMessagesSucceed,
  sendMessageRequest,
  sendMessageSucceed,
  deleteMessageRequest,
  deleteMessageSucceed,
  editMessageRequest,
  editMessageSucceed,
  getSelectedChatId,
};
