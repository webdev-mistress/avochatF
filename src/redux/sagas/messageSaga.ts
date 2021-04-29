import { call, put, select, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/types';
import { IAction } from '@/utils/types';
import {
  deleteMessage, editMessage,
  getMessages as getMessagesFromApi,
  sendMessage,
} from '@/redux/api/messageApi';
import { selectUserLogin } from '@/redux/store/user/selectors';
import { selectActiveChatId, selectMessages } from '@/redux/store/chat/selectors';
import {
  deleteMessageFailed,
  deleteMessageRequest, editMessageFailed,
  editMessageRequest, getMessagesFailed,
  getMessagesRequest,
  getMessagesSucceed, sendMessageFailed, sendMessageRequest,
} from '@/redux/store/chat/actions';
import { IMessage } from '@/redux/store/chat/types';
import { IGetMessagesSaga, ISendMessageSaga } from '@/types/sagas';

function* requestMessages(chatId: number | null) {
  try {
    if(!chatId) {
      return;
    }
    const response: IGetMessagesSaga = yield call(getMessagesFromApi, chatId);

    // if (!response.data || !response.ok) {
    //   throw response.message;
    // }
    console.log(response.data, 'myLog response.data');
    yield put(getMessagesSucceed(response.data));
  } catch (error) {
    console.log(error);
    // yield put(getErrorMessageRequest(getErrorMessage(error)));
    yield put(getMessagesFailed());
  }
}

function* fetchRequestMessages(action: IAction<number>) {
  yield call(requestMessages, action.payload);
}

function* fetchSendMessage(action: IAction<string>) {
  try {
    const login = yield select(selectUserLogin);
    const chatId = yield select(selectActiveChatId);

    yield call(
      sendMessage, login, chatId, action.payload,
    );

    // if (!response.data || !response.ok) {
    //   throw response.message;
    // }
    yield call(requestMessages, chatId);
  } catch (error) {
    yield put(sendMessageFailed());
  }
}

function* fetchDeleteMessage(action: any) {
  const state = yield select(state => state);

  try {
    yield call(deleteMessage, action.payload);
    const chatId = selectActiveChatId(state);

    yield call(requestMessages, chatId);
  } catch (error) {
    yield put(deleteMessageFailed());
  }
}

function* fetchEditMessage(action: any) {
  console.log(action);
  try {
    const { editMessageId, messageEdit } = action.payload;

    const response: ISendMessageSaga = yield call(
      editMessage, editMessageId, messageEdit,
    );

    // if (!response.data || !response.ok) {
    //   throw response.message;
    // }

    const messages = yield select(selectMessages);
    const newMessages = messages.map((message: IMessage) =>
      message.messageId === editMessageId ? response.data : message);
    yield put(getMessagesSucceed(newMessages));
  } catch (error) {
    console.error(error);
    yield put(editMessageFailed(error));
  }
}

export function* messageSaga(): SagaIterator {
  yield takeEvery(getMessagesRequest, fetchRequestMessages);
  yield takeEvery(sendMessageRequest, fetchSendMessage);
  yield takeEvery(deleteMessageRequest, fetchDeleteMessage);
  yield takeEvery(editMessageRequest, fetchEditMessage);
}
