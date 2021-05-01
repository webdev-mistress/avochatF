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
  deleteMessageRequest,
  editMessageRequest,
  getMessagesRequest,
  getMessagesSucceed, Message,
  sendMessageRequest,
} from '@/redux/store/chat/actions';
import { IMessage } from '@/redux/store/chat/types';
// import { IGetMessagesSaga, ISendMessageSaga } from '@/utils/sagas';
import { setToggleFailed } from '@/redux/store/ui/actions';

function* requestMessages(chatId: number | null) {
  try {
    if(!chatId) {
      return;
    }
    const response: any = yield call(getMessagesFromApi, chatId);
    yield put(getMessagesSucceed(response));
  } catch (error) {
    console.log(error);
    yield put(setToggleFailed({
      errorType: Message.GET_MESSAGES,
      textError: error,
      isError: true,
    }));
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
    yield call(requestMessages, chatId);
  } catch (error) {
    yield put(setToggleFailed({
      errorType: Message.SEND_MESSAGE,
      textError: error,
      isError: true,
    }));
  }
}

function* fetchDeleteMessage(action: any) {
  const state = yield select(state => state);

  try {
    yield call(deleteMessage, action.payload);
    const chatId = selectActiveChatId(state);

    yield call(requestMessages, chatId);
  } catch (error) {
    yield put(setToggleFailed({
      errorType: Message.DELETE_MESSAGE,
      textError: error,
      isError: true,
    }));
  }
}

function* fetchEditMessage(action: any) {
  console.log(action);
  try {
    const { editMessageId, messageEdit } = action.payload;

    const response: any = yield call(
      editMessage, editMessageId, messageEdit,
    );

    const messages = yield select(selectMessages);
    const newMessages = messages.map((message: IMessage) =>
      message.messageId === editMessageId ? response : message);
    yield put(getMessagesSucceed(newMessages));
  } catch (error) {
    console.error(error);
    yield put(setToggleFailed({
      errorType: Message.EDIT_MESSAGE,
      textError: error,
      isError: true,
    }));
  }
}

export function* messageSaga(): SagaIterator {
  yield takeEvery(getMessagesRequest, fetchRequestMessages);
  yield takeEvery(sendMessageRequest, fetchSendMessage);
  yield takeEvery(deleteMessageRequest, fetchDeleteMessage);
  yield takeEvery(editMessageRequest, fetchEditMessage);
}
