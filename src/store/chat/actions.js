import { GET_MESSAGES, GET_ACTIVE_CHAT } from '../../constants/store';

export const getMessages = (messages) => ({ type: GET_MESSAGES, payload: messages });
export const getActiveChat = (chat) => ({ type: GET_ACTIVE_CHAT, payload: chat });
