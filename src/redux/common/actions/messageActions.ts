import { getApiActions } from '@/utils/redux';

export enum Message {
  GET_MESSAGES = 'GET_MESSAGES',
  SEND_MESSAGE = 'SEND_MESSAGE',
  DELETE_MESSAGE = 'DELETE_MESSAGE',
  EDIT_MESSAGE = 'EDIT_MESSAGE',
}

const [
  getMessagesRequest,
  getMessagesSucceed,
  getMessagesFailed,
] = getApiActions(Message.GET_MESSAGES);

const [
  sendMessagesRequest,
  sendMessagesSucceed,
  sendMessagesFailed,
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
  getMessagesRequest,
  getMessagesSucceed,
  getMessagesFailed,
  sendMessagesRequest,
  sendMessagesSucceed,
  sendMessagesFailed,
  deleteMessageRequest,
  deleteMessageSucceed,
  deleteMessageFailed,
  editMessageRequest,
  editMessageSucceed,
  editMessageFailed,
};
