import { getResource, Method } from '@/helpers/api';
// import {
//   IAddUserToChatSaga, ICkeckMembersSaga,
//   ICreateChatSaga,
//   IDeleteChatSaga,
//   IDeleteUserFromChatSaga, IEditChatNameSaga,
// } from '@/utils/sagas';

const PREFIX_CHAT = '/api/v0/chat';

export const createChat = function(
  chatName: string,
): Promise<any> {
  return getResource({
    url: `${PREFIX_CHAT}/create`,
    method: Method.POST,
    body: { chatName },
  });
};

export const deleteChat = function(chatId: number): Promise<any> {
  return getResource({
    url: `${PREFIX_CHAT}/delete`,
    method: Method.POST,
    body: { chatId },
  });
};

export const addUserToChat = function(
  login: string, chatId: number,
): Promise<any> {
  return getResource({
    url: `${PREFIX_CHAT}/addUserToChat`,
    method: Method.POST,
    body: { login, chatId },
  });
};

export const deleteUserFromChat = function(
  login: string, chatId: number,
): Promise<any> {
  return getResource({
    url: `${PREFIX_CHAT}/deleteUserFromChat`,
    method: Method.POST,
    body: { login, chatId },
  });
};

export const getParticipants = function(chatId: number): Promise<any> {
  return getResource({
    url: `${PREFIX_CHAT}/getParticipants?chatId=${chatId}`,
    method: Method.GET,
  });
};

export const editChatName = function(
  newName: string, chatId: number,
): Promise<any> {
  return getResource({
    url: `${PREFIX_CHAT}/edit`,
    method: Method.POST,
    body: { newName, chatId },
  });
};
