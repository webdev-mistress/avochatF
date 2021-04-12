import { call, put, takeEvery } from 'redux-saga/effects';
import { IAction } from '@/utils/types';
import { SagaIterator } from '@redux-saga/types';
import {
  createChat,
  deleteChat,
  deleteUserFromChat, editChatName,
  getParticipants,
} from '@/redux/api/chatApi';
import { setShowCreateChat } from '@/redux/store/ui/actions';
import {
  createChatFailed,
  createChatRequest,
  createChatSucceed,
  deleteChatFailed,
  deleteChatRequest,
  deleteChatSucceed,
  deleteUserFromChatFailed,
  deleteUserFromChatRequest,
  deleteUserFromChatSucceed, editChatNameFailed,
  editChatNameRequest,
  editChatNameSucceed, getParticipantsFailed,
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

    // if (!response.data || !response.ok) {
    //   throw response.message;
    // }

    yield put(createChatSucceed(response.data));
    yield put(setShowCreateChat({ isActive: false }));
  } catch (error) {
    console.error(error);
    yield put(createChatFailed(error));
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
    yield put(deleteChatFailed(error));
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
    yield put(deleteUserFromChatFailed(error));
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
    yield put(getParticipantsFailed(error));
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
    yield put(editChatNameFailed(error));
  }
}

export function* chatSaga(): SagaIterator {
  yield takeEvery(createChatRequest, fetchCreateChat);
  yield takeEvery(deleteChatRequest, fetchDeleteChat);
  yield takeEvery(deleteUserFromChatRequest, fetchDeleteUserFromChat);
  yield takeEvery(getParticipantsRequest, fetchGetParticipants);
  yield takeEvery(editChatNameRequest, fetchEditChatName);
}
