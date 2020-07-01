/* user */
import { getResource } from '@/helpers/api';

const PREFIX_USER = '/user';
const PREFIX_MESSAGES = '/messages';
const PREFIX_CHAT = '/chat';

export const getUser = function (user) {
    return getResource(`${PREFIX_USER}/getUser`, user);
};

export const createUser = function (name, login, password1, password2) {
    return getResource(`${PREFIX_USER}/createUser`, { name, login, password1, password2 });
};

/* messages */
export const getMessages = function (chatId) {
    return getResource(`${PREFIX_MESSAGES}/getMessages`, { chatId });
};

export const sendMessage = function (login, chatId, message) {
    return getResource(`${PREFIX_MESSAGES}/sendMessage`, ({ login, chatId, message }));
};

export const deleteMessage = function (messageId) {
    return getResource(`${PREFIX_MESSAGES}/deleteMessage`, { messageId });
};

export const editMessage = function (messageId, message) {
    return getResource(`${PREFIX_MESSAGES}/editMessage`, { messageId, message });
};

/* chat */

export const createChat = function (chatName, login) {
    return getResource(`${PREFIX_CHAT}/createChat`, { chatName, login });
};

export const deleteChat = function (chatId) {
    return getResource(`${PREFIX_CHAT}/deleteChat`, { chatId });
};

export const addUserToChat = function (login, chatId) {
    return getResource(`${PREFIX_CHAT}/addUserToChat`, { login, chatId });
};

export const deleteUserFromChat = function (login, chatId) {
    return getResource(`${PREFIX_CHAT}/deleteUserFromChat`, { login, chatId });
};

