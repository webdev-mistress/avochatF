import { MESSAGES_SUCCEEDED, GET_ACTIVE_CHAT, MESSAGES_REQUESTED,
     MESSAGES_FAILED, SEND_MESSAGE, SEND_MESSAGE_FAILED, DELETE_MESSAGE,
     DELETE_MESSAGE_FAILED } from '../../constants/store';

export const getMessages = (messages) => ({ type: MESSAGES_SUCCEEDED, payload: messages });

export const requestMessages = (chatId) => ({ type: MESSAGES_REQUESTED, payload: { chatId } });

export const errorMessages = (errorMessage) => ({ type: MESSAGES_FAILED, payload: { errorMessage } });

export const sendMessage = (messageText) => ({ type: SEND_MESSAGE, payload: { messageText } });

export const sendMessageFailed = (errorMessage) => ({ type: SEND_MESSAGE_FAILED, payload: { errorMessage } });

export const deleteMessage = (messageId) => ({ type: DELETE_MESSAGE, payload: { messageId } });

export const deleteMessageFailed = (errorMessage) => ({ type: DELETE_MESSAGE_FAILED, payload: { errorMessage } });

export const getActiveChat = (chat) => ({ type: GET_ACTIVE_CHAT, payload: chat });
