import { getResource } from '@/helpers/api';
import {
  IAddUserToChatSaga, ICkeckMembersSaga,
  ICreateChatSaga,
  ICreateUserSaga, IDeleteChatSaga,
  IDeleteMessageSaga, IDeleteUserFromChatSaga, IEditChatNameSaga,
  IEditMessageSaga, IEditUserSaga,
  IGetMessagesSaga,
  IGetUserSaga,
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
export const getUser = function(user: IRequestUserData): Promise<IGetUserSaga> {
  return getResource(`${PREFIX_AUTH}/signIn?withChats=true`, user);
};

export const createUser = function (
  email: string,
  name: string,
  login: string,
  password: string,
): Promise<ICreateUserSaga> {
  return getResource(`${PREFIX_AUTH}/signUp`, { email, name, login, password });
};

export const confirmUser = function(token: string) {
  return getResource(`${PREFIX_AUTH}/confirm?token=${token}`);
};

export const editUser = function(changedFields: IChangedFields): Promise<IEditUserSaga> {
  return getResource(`${PREFIX_USER}/edit`, changedFields);
};

/* messages */
export const getMessages = function(chatId: number): Promise<IGetMessagesSaga> {
  return getResource(`${PREFIX_MESSAGES}/get?chatId=${chatId}`);
};

export const sendMessage = function(
  login: string, chatId: number, message: string,
): Promise<ISendMessageSaga> {
  return getResource(`${PREFIX_MESSAGES}/send`, ({ login, chatId, message }));
};

export const deleteMessage = function(messageId: number): Promise<IDeleteMessageSaga> {
  return getResource(`${PREFIX_MESSAGES}/delete`, { messageId });
};

export const editMessage = function(
  messageId: number, message: string,
): Promise<IEditMessageSaga> {
  return getResource(`${PREFIX_MESSAGES}/edit`, { messageId, message });
};

/* chat */
export const createChat = function(
  chatName: string, login: string,
): Promise<ICreateChatSaga> {
  return getResource(`${PREFIX_CHAT}/create`, { chatName, login });
};

export const deleteChat = function(chatId: number): Promise<IDeleteChatSaga> {
  return getResource(`${PREFIX_CHAT}/delete`, { chatId });
};

export const addUserToChat = function(
  login: string, chatId: number,
): Promise<IAddUserToChatSaga> {
  return getResource(`${PREFIX_CHAT}/addUserToChat`, { login, chatId });
};

export const deleteUserFromChat = function(
  userId: number, chatId: number,
): Promise<IDeleteUserFromChatSaga> {
  return getResource(`${PREFIX_CHAT}/deleteUserFromChat`, { userId, chatId });
};

export const getParticipants = function(chatId: number): Promise<ICkeckMembersSaga> {
  return getResource(`${PREFIX_CHAT}/getParticipants?chatId=${chatId}`);
};

export const editChatName = function(
  newChatName: string, chatId: number,
): Promise<IEditChatNameSaga> {
  return getResource(`${PREFIX_CHAT}/edit`, { newChatName, chatId });
};
