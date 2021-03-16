import { call, put, takeEvery } from 'redux-saga/effects';
import { User } from '@/constants/store';
import { getChatParticipants } from '@/redux/store/chat/actions';
import { addUserToChat } from '@/redux/api/chatApi';
import { editUser } from '@/redux/api/userApi';
import { editCurrentUserSucceed } from '@/redux/store/user/actions';
import { IAddUserToChat } from '@/types/store/chatActions';
import {
  IAddUserToChatSaga,
  IEditUserSaga,
} from '@/types/sagas';
import { IEditUserData } from '@/types/store/userActions';

function* fetchAddUserToChat(action: IAddUserToChat) {
  try {
    const { login, selectedChatId } = action.payload.chatData;
    const response: IAddUserToChatSaga = yield call(addUserToChat, login, selectedChatId);
    if (response.ok) {
      yield put(getChatParticipants(response.data.addedChatId));
    }
  } catch (error) {
    console.error(error);
  }
}

function* fetchEditCurrentUser(action: IEditUserData) {
  try {
    const response: IEditUserSaga = yield call(editUser, action.payload);
    if (response.ok) {
      yield put(editCurrentUserSucceed(response.data.changedFields));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* userSaga(): any {
  yield takeEvery(User.ADD_USER_TO_CHAT, fetchAddUserToChat);
  yield takeEvery(User.EDIT_CURRENT_USER_REQUEST, fetchEditCurrentUser);
}
