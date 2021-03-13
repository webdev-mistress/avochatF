import { call, put, takeEvery } from 'redux-saga/effects';
import { User } from '@/constants/store';
import { accessToken } from '@/helpers/localStorage';
import { getChatParticipants } from '@/redux/store/chat/actions';
import { confirmUser, logoutUser, signInUser, signUpUser } from '@/redux/api/authApi';
import { addUserToChat } from '@/redux/api/chatApi';
import { editUser } from '@/redux/api/userApi';
import {
  editCurrentUserSucceed,
  signInUserFailed,
  signInUserSucceed, signUpUserFailed,
} from '@/redux/store/user/actions';
import {
  IAddUserToChat,

} from '@/types/store/chatActions';
import {
  IAddUserToChatSaga,
  IEditUserSaga, ISignInUserSaga,
} from '@/types/sagas';
import {
  IEditUserData,
  IRequestConfirm, ISignInUserRequest, ISignUpRequestUser,
} from '@/types/store/userActions';

function* fetchSignIn(action: ISignInUserRequest) {
  try {
    const userResponse: ISignInUserSaga = yield call(signInUser, action.payload.user);

    if (!userResponse.data || !userResponse.ok) {
      throw userResponse;
    }
    accessToken.set(userResponse.data.accessToken);
    delete userResponse.data.accessToken;
    yield put(signInUserSucceed(userResponse.data));
  } catch (error) {
    yield put(signInUserFailed(error.message));
  }
}

function* fetchSignUp(action: ISignUpRequestUser) {
  try {
    const { email, name, login, password } = action.payload.userData;
    const newUserResponse = yield call(signUpUser, email, name, login, password);

    if (!newUserResponse.data || !newUserResponse.ok) {
      throw newUserResponse;
    }
  } catch (error) {
    yield put(signUpUserFailed(error.message));
  }
}

function* fetchConfirmUser(action: IRequestConfirm) {
  try {
    const userResponse = yield call(confirmUser, action.payload.token);
    accessToken.set(userResponse.data.accessToken);
    delete userResponse.data.accessToken;
    if (userResponse.ok) {
      yield put(signInUserSucceed(userResponse.data));
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

function* fetchLogout() {
  const token = accessToken.get();
  try {
    yield call(logoutUser, token);
  } catch (error) {
    console.log(error);
  }
}

export function* userSaga(): any {
  yield takeEvery(User.SIGN_IN_REQUEST, fetchSignIn);
  yield takeEvery(User.SIGN_UP_REQUEST, fetchSignUp);
  yield takeEvery(User.ADD_USER_TO_CHAT, fetchAddUserToChat);
  yield takeEvery(User.EDIT_CURRENT_USER_REQUEST, fetchEditCurrentUser);
  yield takeEvery(User.CONFIRM_USER_REQUEST, fetchConfirmUser);
  yield takeEvery(User.LOGOUT, fetchLogout);
}
