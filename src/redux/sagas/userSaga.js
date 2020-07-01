import { call, put, takeEvery } from 'redux-saga/effects';

import { USER_FETCH_REQUESTED, USER_FETCH_SUCCEEDED, USER_FETCH_FAILED,
    USER_CREATE_REQUESTED,
    ADD_USER_TO_CHAT } from '@/constants/store';
import { getUser, createUser, addUserToChat } from '@/redux/api';

function* fetchUser(action) {
    try {
        const userResponse = yield call(getUser, action.payload.user);

        if(!userResponse.data || !userResponse.ok) {
            throw userResponse.message;
        }

        yield put({ type: USER_FETCH_SUCCEEDED, payload: { userData: userResponse.data } });
    } catch (error) {
        yield put({ type: USER_FETCH_FAILED, payload: { errorMessage: error } });
    }
}

function* fetchCreateUser(action) {
    try {
        const { name, login, password1, password2 } = action.payload.userData;
        const newUserResponse = yield call(createUser, name, login, password1, password2);

        if(!newUserResponse.data || !newUserResponse.ok) {
            throw newUserResponse.message;
        }

        yield put({ type: USER_FETCH_SUCCEEDED, payload: { userData: newUserResponse.data } });
    } catch (error) {
        yield put({ type: USER_FETCH_FAILED, payload: { errorMessage: error } });
    }
}

function* fetchAddUserToChat(action) {
    try {
        const { login, selectedChatId } = action.payload.chatData;
        yield call(addUserToChat, login, selectedChatId);
    } catch (error) {
        console.error(error);
    }
}

export function* userSaga() {
    yield takeEvery(USER_FETCH_REQUESTED, fetchUser);
    yield takeEvery(USER_CREATE_REQUESTED, fetchCreateUser);
    yield takeEvery(ADD_USER_TO_CHAT, fetchAddUserToChat);
}
