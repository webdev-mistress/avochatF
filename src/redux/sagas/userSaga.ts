import { call, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/types';
import { addUserToChat } from '@/redux/api/chatApi';
import { editUser } from '@/redux/api/userApi';
import {
  editCurrentUserSucceed,
  addUserToChatRequest,
  editCurrentUserRequest,
  addUserToChatSucceed, User,
} from '@/redux/store/user/actions';
import { getParticipantsRequest } from '@/redux/store/chat/actions';
import {
  IAddUserToChatSaga,
  IEditUserSaga,
} from '@/types/sagas';
import { setToggleFailed } from '@/redux/store/ui/actions';

function* fetchAddUserToChat(action: any) {
  try {
    const { login, selectedChatId } = action.payload;
    const response: IAddUserToChatSaga = yield call(addUserToChat, login, selectedChatId);
    if (response.ok) {
      yield put(getParticipantsRequest(response.data.addedChatId));
      yield put(addUserToChatSucceed());
    }
  } catch (error) {
    console.error(error);
    yield put(setToggleFailed({
      errorType: User.ADD_USER_TO_CHAT,
      textError: error,
      isError: true,
    }));
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
    yield put(setToggleFailed({
      errorType: User.EDIT_CURRENT_USER,
      textError: error,
      isError: true,
    }));
  }
}

export function* userSaga(): SagaIterator {
  yield takeEvery(addUserToChatRequest, fetchAddUserToChat);
  yield takeEvery(editCurrentUserRequest, fetchEditCurrentUser);
}
