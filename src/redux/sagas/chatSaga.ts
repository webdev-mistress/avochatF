import { call, put, takeEvery } from 'redux-saga/effects';
import { IAction } from '@/utils/types';
import { SagaIterator } from '@redux-saga/types';
import {
  createChat,
  deleteChat,
  deleteUserFromChat, editChatName,
  getParticipants,
} from '@/redux/api/chatApi';
import { setShowCreateChat, setToggleFailed } from '@/redux/store/ui/actions';
import {
  Chat,
  createChatRequest,
  createChatSucceed,
  deleteChatRequest,
  deleteChatSucceed,
  deleteUserFromChatRequest,
  deleteUserFromChatSucceed,
  editChatNameRequest,
  editChatNameSucceed,
  getParticipantsRequest,
  getParticipantsSucceed,
} from '@/redux/store/chat/actions';
import { IReadableUserResponse } from '@/redux/sagas/utils/types';

function* fetchCreateChat(action: IAction<string>) {
  try {
    const response: any = yield call(createChat, action.payload);

    yield put(createChatSucceed(response));
    yield put(setShowCreateChat({ isActive: false }));
  } catch (error) {
    console.error(error);
    yield put(setToggleFailed({
      errorType: Chat.CREATE_CHAT,
      textError: error,
      isError: true,
    }));
  }
}

function* fetchDeleteChat(action: any) {
  try {
    yield call(deleteChat, action.payload);
    yield put(deleteChatSucceed(action.payload));
  } catch (error) {
    console.error(error);
    yield put(setToggleFailed({
      errorType: Chat.DELETE_CHAT,
      textError: error,
      isError: true,
    }));
  }
}

function* fetchDeleteUserFromChat(action: any) {
  try {
    const { login, chatId } = action.payload;
    yield call(deleteUserFromChat, login, chatId);
    yield put(deleteUserFromChatSucceed({ login, chatId }));
  } catch (error) {
    console.error(error);
    yield put(setToggleFailed({
      errorType: Chat.DELETE_USER_FROM_CHAT,
      textError: error,
      isError: true,
    }));
  }
}

function* fetchGetParticipants(action: any) {
  const chatId: number = action.payload;
  try {
    const participantsInfo: IReadableUserResponse = yield call(getParticipants, chatId);
    yield put(getParticipantsSucceed({ participantsInfo, chatId }));
  } catch (error) {
    console.error(error);
    yield put(setToggleFailed({
      errorType: Chat.GET_CHAT_PARTICIPANTS,
      textError: error,
      isError: true,
    }));
  }
}

function* fetchEditChatName(action: any) {
  try {
    const { name, id } = action.payload;
    const response: any = yield call(editChatName, name, id);
    console.log(response, 'myLog response');
    yield put(editChatNameSucceed({ name, id }));
  } catch (error) {
    console.error(error);
    yield put(setToggleFailed({
      errorType: Chat.EDIT_CHAT_NAME,
      textError: error,
      isError: true,
    }));
  }
}

export function* chatSaga(): SagaIterator {
  yield takeEvery(createChatRequest, fetchCreateChat);
  yield takeEvery(deleteChatRequest, fetchDeleteChat);
  yield takeEvery(deleteUserFromChatRequest, fetchDeleteUserFromChat);
  yield takeEvery(getParticipantsRequest, fetchGetParticipants);
  yield takeEvery(editChatNameRequest, fetchEditChatName);
}
