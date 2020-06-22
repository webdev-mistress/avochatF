import { USER_FETCH_REQUESTED, USER_FETCH_FAILED, USER_FETCH_SUCCEEDED, ADD_NEW_CHAT,
    USER_LOGOUT, REMOVE_AUTH_ERROR_MESSAGE, USER_CREATE_REQUESTED, ADD_USER_TO_CHAT,
    DELETE_OLD_CHAT } from '../../../constants/store';

export const requestUser = user => ({ type: USER_FETCH_REQUESTED, payload: { user } });

export const getUser = user => ({ type: USER_FETCH_SUCCEEDED, payload: { user } });

export const failedUser = (errorMessage) => ({ type: USER_FETCH_FAILED, payload: { errorMessage } });

export const logoutUser = () => ({ type: USER_LOGOUT });

export const removeErrorMessage = () => ({ type: REMOVE_AUTH_ERROR_MESSAGE });

export const requestCreateUser = (userData) => ({ type: USER_CREATE_REQUESTED, payload: { userData } });

export const addUserToChat = (chatData) => ({ type: ADD_USER_TO_CHAT, payload: { chatData } });

export const addNewChat = (chat) => ({ type: ADD_NEW_CHAT, payload: { chat } });

export const deleteOldChat = (chatId) => ({ type: DELETE_OLD_CHAT, payload: { chatId } });
