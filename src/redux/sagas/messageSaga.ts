import { call, put, select, takeEvery } from 'redux-saga/effects';
import { getErrorMessage } from '@/helpers/sagas';
import { Chat } from '@/constants/store';
import {
  deleteMessage, editMessage,
  getMessages as getMessagesFromApi,
  sendMessage,
} from '@/redux/api/messageApi';
import {
  deleteMessageFailed,
  errorMessages,
  getMessages,
  sendMessageFailed,
} from '@/redux/store/chat/actions';
import { selectUserLogin } from '@/redux/store/user/selectors';
import { selectActiveChatId, selectMessages } from '@/redux/store/chat/selectors';
import {
  IDeleteMessage, IEditMessage, IMessage,
  IRequestMessages,
  ISendMessage,
} from '@/types/store/chatActions';
import { IGetMessagesSaga, ISendMessageSaga } from '@/types/sagas';

function* requestMessages(chatId: number) {
  try {
    const response: IGetMessagesSaga = yield call(getMessagesFromApi, chatId);

    if (!response.data || !response.ok) {
      throw response.message;
    }

    yield put(getMessages(response.data));
  } catch (error) {
    yield put(errorMessages(getErrorMessage(error)));
  }
}

function* fetchRequestMessages(action: IRequestMessages) {
  yield call(requestMessages, action.payload.chatId);
}

function* fetchSendMessage(action: ISendMessage) {
  try {
    const login = yield select(selectUserLogin);
    const chatId = yield select(selectActiveChatId);

    const response: ISendMessageSaga = yield call(
      sendMessage, login, chatId, action.payload.messageText,
    );

    if (!response.data || !response.ok) {
      throw response.message;
    }
    yield call(requestMessages, chatId);
  } catch (error) {
    yield put(sendMessageFailed(getErrorMessage(error)));
  }
}

function* fetchDeleteMessage(action: IDeleteMessage) {
  const state = yield select(state => state);

  try {
    yield call(deleteMessage, action.payload.messageId);
    const chatId = selectActiveChatId(state);

    yield call(requestMessages, chatId);
  } catch (error) {
    yield put(deleteMessageFailed(getErrorMessage(error)));
  }
}

function* fetchEditMessage(action: IEditMessage) {
  try {
    const { editMessageId, messageEdit } = action.payload.messageData;

    const response: ISendMessageSaga = yield call(
      editMessage, editMessageId, messageEdit,
    );

    if (!response.data || !response.ok) {
      throw response.message;
    }

    const messages = yield select(selectMessages);
    const newMessages = messages.map((message: IMessage) =>
      message.messageId === editMessageId ? response.data : message);
    yield put(getMessages(newMessages));
  } catch (error) {
    console.error(error);
  }
}

export function* messageSaga(): any {
  yield takeEvery(Chat.MESSAGES_REQUESTED, fetchRequestMessages);
  yield takeEvery(Chat.SEND_MESSAGE, fetchSendMessage);
  yield takeEvery(Chat.DELETE_MESSAGE, fetchDeleteMessage);
  yield takeEvery(Chat.EDIT_MESSAGE, fetchEditMessage);
}
