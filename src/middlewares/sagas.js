import { call, put, takeEvery } from 'redux-saga/effects';

import { getUser } from '../api';
import { USER_FETCH_REQUESTED, USER_FETCH_SUCCEEDED, USER_FETCH_FAILED } from '../constants/store';

function* fetchUser(action) {
    try {
        const user = yield call(getUser, action.user);

        yield put({ type: USER_FETCH_SUCCEEDED, user });
    } catch (err) {
        yield put({ type: USER_FETCH_FAILED });
    }
}

export function* userSaga() {
    yield takeEvery(USER_FETCH_REQUESTED, fetchUser);
}
