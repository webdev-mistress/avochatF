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
import {
  ICreateChatSaga,
  IDeleteChatSaga,
  IDeleteUserFromChatSaga,
  ICkeckMembersSaga, IEditChatNameSaga,
} from '@/types/sagas';

function* fetchCreateChat(action: IAction<string>) {
  try {
    const response: ICreateChatSaga = yield call(createChat, action.payload);

    yield put(createChatSucceed(response.data));
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
    const response: IDeleteChatSaga = yield call(deleteChat, action.payload);

    if (response.ok) {
      yield put(deleteChatSucceed(action.payload));
    }
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
    const response: IDeleteUserFromChatSaga = yield call(
      deleteUserFromChat, login, chatId,
    );
    if (response.ok) {
      yield put(deleteUserFromChatSucceed({ login, chatId }));
    }
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
    const response: ICkeckMembersSaga = yield call(getParticipants, chatId);
    if (response.ok) {
      yield put(getParticipantsSucceed({ chatMembersInfo: response.data, chatId }));
    }
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
    const response: IEditChatNameSaga = yield call(editChatName, name, id);
    if (response.ok) {
      yield put(editChatNameSucceed({ name, id }));
    }
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
