import { call, put, takeEvery } from 'redux-saga/effects';

import { getErrorMessage } from '../helpers/sagas';
import { USER_FETCH_REQUESTED, USER_FETCH_SUCCEEDED, USER_FETCH_FAILED } from '../constants/store';
import { getUser } from '../api';

function* fetchUser(action) {
    try {
        const user = yield call(getUser, action.payload.user);

        yield put({ type: USER_FETCH_SUCCEEDED, payload: { user } });
    } catch (error) {
        yield put({ type: USER_FETCH_FAILED, payload: getErrorMessage(error) });
    }
}

export function* userSaga() {
    yield takeEvery(USER_FETCH_REQUESTED, fetchUser);
}
