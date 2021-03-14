import { call, put, takeEvery } from 'redux-saga/effects';
import { accessToken } from '@/helpers/localStorage';
import { User } from '@/constants/store';
import { confirmUser, signInUser, signUpUser } from '@/redux/api/authApi';
import {
  signInUserFailed,
  signInUserSucceed,
  signUpUserFailed,
} from '@/redux/store/user/actions';
import { ISignInUserSaga } from '@/types/sagas';
import {
  IRequestConfirm,
  ISignInUserRequest,
  ISignUpRequestUser,
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

export function* authSaga(): any {
  yield takeEvery(User.SIGN_IN_REQUEST, fetchSignIn);
  yield takeEvery(User.SIGN_UP_REQUEST, fetchSignUp);
  yield takeEvery(User.CONFIRM_USER_REQUEST, fetchConfirmUser);
}
