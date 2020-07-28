import { call, put, takeEvery } from 'redux-saga/effects';
import { User } from '@/constants/store';
import { getUser, createUser, addUserToChat } from '@/redux/api';
import { failedUser, getUserSucceeded } from '@/redux/store/user/actions';
import { IAddUserToChat, IRequestCreateUser, IRequestUser } from '@/types/store';
import { ICreateUserSaga, IGetUserSaga } from '@/types/sagas';

function* fetchUser(action: IRequestUser) {
    try {
        const userResponse: IGetUserSaga = yield call(getUser, action.payload.user);

        if(!userResponse.data || !userResponse.ok) {
            throw userResponse;
        }
        yield put(getUserSucceeded(userResponse.data));
    } catch (error) {
        yield put(failedUser(error.message));
    }
}

function* fetchCreateUser(action: IRequestCreateUser) {
    try {
        const { name, login, password1, password2 } = action.payload.userData;
        const newUserResponse: ICreateUserSaga = yield call(createUser, name, login, password1, password2);

        if(!newUserResponse.data || !newUserResponse.ok) {
            throw newUserResponse;
        }
        yield put(getUserSucceeded(newUserResponse.data));
    } catch (error) {
        yield put(failedUser(error.message));
    }
}

function* fetchAddUserToChat(action: IAddUserToChat) {
    try {
        const { login, selectedChatId } = action.payload.chatData;
        yield call(addUserToChat, login, selectedChatId);
    } catch (error) {
        console.error(error);
    }
}

export function* userSaga() {
    yield takeEvery(User.FETCH_REQUESTED, fetchUser);
    yield takeEvery(User.CREATE_REQUESTED, fetchCreateUser);
    yield takeEvery(User.ADD_USER_TO_CHAT, fetchAddUserToChat);
}
