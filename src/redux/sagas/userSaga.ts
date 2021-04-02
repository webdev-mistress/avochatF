import { call, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/types';
import { addUserToChat } from '@/redux/api/chatApi';
import { editUser } from '@/redux/api/userApi';
import {
  editCurrentUserSucceed,
  addUserToChatRequest,
  editCurrentUserRequest,
} from '@/redux/store/user/actions';
import { getParticipantsRequest } from '@/redux/store/chat/actions';
import {
  IAddUserToChatSaga,
  IEditUserSaga,
} from '@/types/sagas';

function* fetchAddUserToChat(action: any) {
  try {
    const { login, selectedChatId } = action.payload;
    const response: IAddUserToChatSaga = yield call(addUserToChat, login, selectedChatId);
    if (response.ok) {
      yield put(getParticipantsRequest(response.data.addedChatId));
    }
  } catch (error) {
    console.error(error);
  }
}

function* fetchEditCurrentUser(action: any) {
  try {
    const response: IEditUserSaga = yield call(editUser, action.payload);
    if (response.ok) {
      yield put(editCurrentUserSucceed(action.payload));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* userSaga(): SagaIterator {
  yield takeEvery(addUserToChatRequest, fetchAddUserToChat);
  yield takeEvery(editCurrentUserRequest, fetchEditCurrentUser);
}
