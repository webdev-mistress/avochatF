import { getApiActions } from '@/utils/redux';
import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory();

export enum Chat {
  CREATE_CHAT = 'CREATE_CHAT',
  DELETE_CHAT = 'DELETE_CHAT',
  GET_ACTIVE_CHAT = 'GET_ACTIVE_CHAT',
  CLEAR_CHAT = 'CLEAR_CHAT',
  DELETE_USER_FROM_CHAT = 'DELETE_USER_FROM_CHAT',
  GET_CHAT_PARTICIPANTS = 'GET_CHAT_PARTICIPANTS',
  EDIT_CHAT_NAME = 'EDIT_CHAT_NAME',
}

const getActiveChat = actionCreator(Chat.GET_ACTIVE_CHAT);
const clearChat = actionCreator(Chat.CLEAR_CHAT);

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
};
