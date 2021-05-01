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
// import {
//   IAddUserToChatSaga,
//   IEditUserSaga,
// } from '@/utils/sagas';
import { setToggleFailed } from '@/redux/store/ui/actions';

function* fetchAddUserToChat(action: any) {
  try {
    const { login, selectedChatId } = action.payload;
    const response: any = yield call(addUserToChat, login, selectedChatId);
    yield put(getParticipantsRequest(response));
    yield put(addUserToChatSucceed());
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
    yield call(editUser, action.payload);
    yield put(editCurrentUserSucceed(action.payload));
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
