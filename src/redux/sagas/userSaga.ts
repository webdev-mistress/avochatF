import { call, put, takeEvery } from 'redux-saga/effects';
import { User } from '@/constants/store';
import { accessToken } from '@/helpers/localStorage';
import {
  addNewUserValue,
  failedUser,
  getUserSucceeded,
} from '@/redux/store/user/actions';
import { getChatParticipants } from '@/redux/store/chat/actions';
import { confirmUser, logoutUser, signInUser, signUpUser } from '@/redux/api/authApi';
import { addUserToChat } from '@/redux/api/chatApi';
import { editUser } from '@/redux/api/userApi';
import {
  IAddUserToChat,

} from '@/types/store/chatActions';
import {
  IAddUserToChatSaga,
  IEditUserSaga,
  IGetUserSaga,
} from '@/types/sagas';
import {
  IEditUser,
  IRequestConfirm,
  IRequestCreateUser,
  IRequestUser,
} from '@/types/store/userActions';

function* fetchUser(action: IRequestUser) {
  try {
    const userResponse: IGetUserSaga = yield call(signInUser, action.payload.user);

    if (!userResponse.data || !userResponse.ok) {
      throw userResponse;
    }
    accessToken.set(userResponse.data.accessToken);
    delete userResponse.data.accessToken;
    yield put(getUserSucceeded(userResponse.data));
  } catch (error) {
    yield put(failedUser(error.message));
  }
}

function* fetchCreateUser(action: IRequestCreateUser) {
  try {
    const { email, name, login, password } = action.payload.userData;
    const newUserResponse = yield call(signUpUser, email, name, login, password);

    if (!newUserResponse.data || !newUserResponse.ok) {
      throw newUserResponse;
    }
  } catch (error) {
    yield put(failedUser(error.message));
  }
}

function* fetchConfirmUser(action: IRequestConfirm) {
  try {
    const userResponse = yield call(confirmUser, action.payload.token);
    accessToken.set(userResponse.data.accessToken);
    delete userResponse.data.accessToken;
    if (userResponse.ok) {
      yield put(getUserSucceeded(userResponse.data));
    }
  } catch (error) {
    console.log(error);
  }
}

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

function* fetchEditOldUser(action: IEditUser) {
  try {
    const response: IEditUserSaga = yield call(editUser, action.payload);
    if (response.ok) {
      yield put(addNewUserValue(response.data.changedFields));
    }
  } catch (error) {
    console.log(error);
  }
}

function* fetchLogout() {
  const token = accessToken.get();
  try {
    yield call(logoutUser, token);
  } catch (error) {
    console.log(error);
  }
}

export function* userSaga(): any {
  yield takeEvery(User.FETCH_REQUESTED, fetchUser);
  yield takeEvery(User.CREATE_REQUESTED, fetchCreateUser);
  yield takeEvery(User.ADD_USER_TO_CHAT, fetchAddUserToChat);
  yield takeEvery(User.EDIT_OLD_USER, fetchEditOldUser);
  yield takeEvery(User.CONFIRM_REQUESTED, fetchConfirmUser);
  yield takeEvery(User.LOGOUT, fetchLogout);
}
