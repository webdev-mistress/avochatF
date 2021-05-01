import { getResource, Method } from '@/helpers/api';
// import {
//   IDeleteMessageSaga,
//   IEditMessageSaga,
//   IGetMessagesSaga,
//   ISendMessageSaga,
// } from '@/utils/sagas';

const PREFIX_MESSAGES = '/api/v0/message';

export const getMessages = function(chatId: number): Promise<any> {
  return getResource({
    url: `${PREFIX_MESSAGES}/get?chatId=${chatId}`,
    method: Method.GET,
  });
};

export const sendMessage = function(
  login: string, chatId: number, message: string,
): Promise<any> {
  return getResource({
    url: `${PREFIX_MESSAGES}/send`,
    method: Method.POST,
    body: { login, chatId, message },
  });
};

export const deleteMessage = function(messageId: number): Promise<any> {
  return getResource({
    url: `${PREFIX_MESSAGES}/delete`,
    method: Method.POST,
    body: { messageId },
  });
};

export const editMessage = function(
  messageId: number, message: string,
): Promise<any> {
  return getResource({
    url: `${PREFIX_MESSAGES}/edit`,
    method: Method.POST,
    body: { messageId, message },
  });
};
