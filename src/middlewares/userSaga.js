import { call, put, takeEvery } from 'redux-saga/effects';

import { getErrorMessage } from '../helpers/sagas';
import { USER_FETCH_REQUESTED, USER_FETCH_SUCCEEDED, USER_FETCH_FAILED,
    USER_CREATE_REQUESTED } from '../constants/store';
import { getUser, createUser } from '../api';

function* fetchUser(action) {
    try {
        const userData = yield call(getUser, action.payload.user);

        yield put({ type: USER_FETCH_SUCCEEDED, payload: { userData } });
    } catch (error) {
        yield put({ type: USER_FETCH_FAILED, payload: getErrorMessage(error) });
    }
}

function* fetchCreateUser(action) {
    try {
        const { name, login, password1, password2 } = action.payload.userData;
        const newUser = yield call(createUser, name, login, password1, password2);

        yield put({ type: USER_FETCH_SUCCEEDED, payload: { userData: newUser } });
    } catch (error) {
        yield put({ type: USER_FETCH_FAILED, payload: getErrorMessage(error) });
    }
}

export function* userSaga() {
    yield takeEvery(USER_FETCH_REQUESTED, fetchUser);
    yield takeEvery(USER_CREATE_REQUESTED, fetchCreateUser);
}
