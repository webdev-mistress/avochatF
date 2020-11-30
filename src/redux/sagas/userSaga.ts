import { call, put, takeEvery } from 'redux-saga/effects';
import { User } from '@/constants/store';
import { getUser, createUser, addUserToChat, editUser } from '@/redux/api';
import { addNewUserValue, failedUser, getUserSucceeded } from '@/redux/store/user/actions';
import { checkChatMembers } from '@/redux/store/chat/actions';
import { IAddUserToChat, IEditUser, IRequestCreateUser, IRequestUser } from '@/types/store';
import { IAddUserToChatSaga, ICreateUserSaga, IEditUserSaga, IGetUserSaga } from '@/types/sagas';

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
        const response: IAddUserToChatSaga = yield call(addUserToChat, login, selectedChatId);
        if (response.ok) {
            yield put(checkChatMembers(response.data.addedChatId));
        }
    } catch (error) {
        console.error(error);
    }
}

function* fetchEditOldUser(action: IEditUser) {
    try {
        const response: IEditUserSaga = yield call(editUser, action.payload);
        if(response.ok) {
            yield put(addNewUserValue(response.data.changedFields));
        }
    } catch (error) {
        console.log(error);
    }
}

export function* userSaga() {
    yield takeEvery(User.FETCH_REQUESTED, fetchUser);
    yield takeEvery(User.CREATE_REQUESTED, fetchCreateUser);
    yield takeEvery(User.ADD_USER_TO_CHAT, fetchAddUserToChat);
    yield takeEvery(User.EDIT_OLD_USER, fetchEditOldUser);
}
