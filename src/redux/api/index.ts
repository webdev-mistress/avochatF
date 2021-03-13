import { getResource, Method } from '@/helpers/api';
import {
  IAddUserToChatSaga,
  ICkeckMembersSaga,
  ICreateChatSaga,
  ICreateUserSaga,
  IDeleteChatSaga,
  IDeleteMessageSaga,
  IDeleteUserFromChatSaga,
  IEditChatNameSaga,
  IEditMessageSaga,
  IEditUserSaga,
  IGetMessagesSaga,
  IGetUserSaga,
  ILogoutUserSaga,
  ISendMessageSaga,
} from '@/types/sagas';
import { IRequestUserData } from '@/types/store/userActions';

const PREFIX_USER = '/api/v0/user';
const PREFIX_MESSAGES = '/api/v0/message';
const PREFIX_CHAT = '/api/v0/chat';
const PREFIX_AUTH = '/api/v0/auth';

interface IChangedFields {
  userId: number,
  newName?: string,
  newLogin?: string,
  oldPassword?: string,
  newPassword1?: string,
  newPassword2?: string,
}

/* user */
export const signInUser = function(user: IRequestUserData): Promise<IGetUserSaga> {
  return getResource({
    url: `${PREFIX_AUTH}/signIn?withChats=true`,
    method: Method.POST,
    body: user,
  });
};

export const createUser = function (
  email: string,
  name: string,
  login: string,
  password: string,
): Promise<ICreateUserSaga> {
  return getResource({
    url: `${PREFIX_AUTH}/signUp`,
    method: Method.POST,
    body: { email, name, login, password },
  });
};

export const confirmUser = function(token: string): Promise<any> {
  return getResource({
    url: `${PREFIX_AUTH}/confirm?token=${token}`,
    method: Method.GET,
  });
};

export const editUser = function(changedFields: IChangedFields): Promise<IEditUserSaga> {
  return getResource({
    url: `${PREFIX_USER}/edit`,
    method: Method.POST,
    body: changedFields,
  });
};

export const logoutUser = function(token: string): Promise<ILogoutUserSaga> {
  return getResource({
    url: `${PREFIX_AUTH}/logout?token=${token}`,
    method: Method.POST,
  });
};

/* messages */
export const getMessages = function(chatId: number): Promise<IGetMessagesSaga> {
  return getResource({
    url: `${PREFIX_MESSAGES}/get?chatId=${chatId}`,
    method: Method.GET,
  });
};

export const sendMessage = function(
  login: string, chatId: number, message: string,
): Promise<ISendMessageSaga> {
  return getResource({
    url: `${PREFIX_MESSAGES}/send`,
    method: Method.POST,
    body: { login, chatId, message },
  });
};

export const deleteMessage = function(messageId: number): Promise<IDeleteMessageSaga> {
  return getResource({
    url: `${PREFIX_MESSAGES}/delete`,
    method: Method.POST,
    body: { messageId },
  });
};

export const editMessage = function(
  messageId: number, message: string,
): Promise<IEditMessageSaga> {
  return getResource({
    url: `${PREFIX_MESSAGES}/edit`,
    method: Method.POST,
    body: { messageId, message },
  });
};

/* chat */
export const createChat = function(
  chatName: string, login: string,
): Promise<ICreateChatSaga> {
  return getResource({
    url: `${PREFIX_CHAT}/create`,
    method: Method.POST,
    body: { chatName, login },
  });
};

export const deleteChat = function(chatId: number): Promise<IDeleteChatSaga> {
  return getResource({
    url: `${PREFIX_CHAT}/delete`,
    method: Method.POST,
    body: { chatId },
  });
};

export const addUserToChat = function(
  login: string, chatId: number,
): Promise<IAddUserToChatSaga> {
  return getResource({
    url: `${PREFIX_CHAT}/addUserToChat`,
    method: Method.POST,
    body: { login, chatId },
  });
};

export const deleteUserFromChat = function(
  login: string, chatId: number,
): Promise<IDeleteUserFromChatSaga> {
  return getResource({
    url: `${PREFIX_CHAT}/deleteUserFromChat`,
    method: Method.POST,
    body: { login, chatId },
  });
};

export const getParticipants = function(chatId: number): Promise<ICkeckMembersSaga> {
  return getResource({
    url: `${PREFIX_CHAT}/getParticipants?chatId=${chatId}`,
    method: Method.GET,
  });
};

export const editChatName = function(
  newName: string, chatId: number,
): Promise<IEditChatNameSaga> {
  return getResource({
    url: `${PREFIX_CHAT}/edit`,
    method: Method.POST,
    body: { newName, chatId },
  });
};
