import { call, put, takeEvery } from 'redux-saga/effects';
import { accessToken } from '@/helpers/localStorage';
import { SagaIterator } from '@redux-saga/types';
import {
  changePassword,
  confirmUser,
  logoutUser,
  signInUser,
  signUpUser,
} from '@/redux/api/authApi';
import {
  Auth,
  changePasswordRequest,
  changePasswordSucceed,
  confirmUserRequest, confirmUserSucceed,
  logout,
  signInRequest,
  signInSucceed,
  signUpRequest, signUpSucceed,
} from '@/redux/store/user/actions';
import { ISignInUserSaga } from '@/types/sagas';
import { setToggleFailed } from '@/redux/store/ui/actions';

function* fetchSignIn(action: any) {
  try {
    const userResponse: ISignInUserSaga = yield call(signInUser, action.payload);
    accessToken.set(userResponse.data.accessToken);
    delete userResponse.data.accessToken;
    yield put(signInSucceed(userResponse.data));
  } catch (error) {
    yield put(setToggleFailed({
      errorType: Auth.SIGN_IN,
      textError: error.message,
      isError: true,
    }));
  }
}

function* fetchSignUp(action: any) {
  try {
    const { email, name, login, password } = action.payload;
    // тут хотелось бы передавать объект
    yield call(signUpUser, email, name, login, password);
    yield put(signUpSucceed());
  } catch (error) {
    yield put(setToggleFailed({
      errorType: Auth.SIGN_UP,
      textError: error.message,
      isError: true,
    }));
  }
}

function* fetchConfirmUser(action: any) {
  try {
    const userResponse = yield call(confirmUser, action.payload);
    accessToken.set(userResponse.data.accessToken);
    delete userResponse.data.accessToken;
    if (userResponse.ok) {
      yield put(signInSucceed(userResponse.data));
      yield put(confirmUserSucceed());
    }
  } catch (error) {
    console.log(error);
    yield put(setToggleFailed({
      errorType: Auth.CONFIRM_USER,
      textError: error,
      isError: true,
    }));
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

function* fetchChangePassword(action: any) {
  try {
    const userResponse = yield call(changePassword, action.payload);
    if(userResponse.ok) {
      yield put(changePasswordSucceed());
    }
  } catch (error) {
    console.log(error);
    yield put(setToggleFailed({
      errorType: Auth.CHANGE_PASSWORD,
      textError: error,
      isError: true,
    }));
  }
}

export function* authSaga(): SagaIterator {
  yield takeEvery(signInRequest, fetchSignIn);
  yield takeEvery(signUpRequest, fetchSignUp);
  yield takeEvery(confirmUserRequest, fetchConfirmUser);
  yield takeEvery(logout, fetchLogout);
  yield takeEvery(changePasswordRequest, fetchChangePassword);
}
