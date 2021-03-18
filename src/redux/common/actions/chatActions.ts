import { getApiActions } from '@/utils/redux';

export enum Chat {
  CREATE_CHAT = 'CREATE_CHAT',
  DELETE_CHAT = 'DELETE_CHAT',
  GET_ACTIVE_CHAT = 'GET_ACTIVE_CHAT',
  CLEAR_CHAT = 'CLEAR_CHAT',
  DELETE_USER_FROM_CHAT = 'DELETE_USER_FROM_CHAT',
  GET_CHAT_PARTICIPANTS = 'GET_CHAT_PARTICIPANTS',
  GET_CHAT_PARTICIPANTS_LOADED = 'GET_CHAT_PARTICIPANTS_LOADED',
  DELETE_UNWANTED_USER = 'DELETE_UNWANTED_USER',
  EDIT_CHAT_NAME = 'EDIT_CHAT_NAME',
  ADD_NEW_CHAT_NAME = 'ADD_NEW_CHAT_NAME',
}

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

// const [
//
// ]

export {
  createChatRequest,
  createChatSucceed,
  createChatFailed,
  deleteChatRequest,
  deleteChatSucceed,
  deleteChatFailed,
};
