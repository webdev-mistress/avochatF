import { call, put, takeEvery } from 'redux-saga/effects';

import { getLoto } from '../api';
import { SET_USER_DATA, SET_AUTH } from '../constants/store';

function* fetchLoto() {
    const loto = yield call(getLoto);

    yield put({ type: SET_AUTH, user: loto });
}

export function* mySaga() {
    yield takeEvery(SET_USER_DATA, fetchLoto);
}
