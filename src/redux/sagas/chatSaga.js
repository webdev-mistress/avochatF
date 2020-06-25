import { call, put, takeEvery, select } from 'redux-saga/effects';

import {
    SEND_MESSAGE, MESSAGES_REQUESTED, DELETE_MESSAGE, EDIT_MESSAGE,
    CREATE_CHAT, DELETE_CHAT, DELETE_USER_FROM_CHAT
} from '../../constants/store';
import { errorMessages, getMessages, sendMessageFailed,
     deleteMessageFailed } from '../store/chat/actions';
import { selectActiveChatId, selectMessages } from '../store/chat/selectors';
import { selectUserId, selectUserLogin } from '../store/user/selectors';
import { getErrorMessage } from '../../helpers/sagas';
import { getMessages as getMessagesFromApi, sendMessage, deleteMessage,
    editMessage, createChat, deleteChat, deleteUserFromChat } from '../api';
import { addNewChat, deleteOldChat, deleteUnwanterUser } from '../store/user/actions';

function* fetchRequestMessages(action) {
    try {
        const { messages } = yield call(getMessagesFromApi, action.payload.chatId);

        yield put(getMessages(messages));
    } catch (error) {
        yield put(errorMessages(getErrorMessage(error)));
    }
}

function* fetchSendMessage(action) {
    try {
        const state = yield select(state => state);
        const userId = selectUserId(state);
        const chatId = selectActiveChatId(state);

        yield call(sendMessage, userId, chatId, action.payload.messageText);

        yield call(fetchRequestMessages, { payload: { chatId } });
    } catch (error) {
        yield put(sendMessageFailed(getErrorMessage(error)));
    }
}

function* fetchDeleteMessage(action) {
    const state = yield select(state => state);

    try {
       yield call(deleteMessage, action.payload.messageId);
       const chatId = selectActiveChatId(state);

       yield call(fetchRequestMessages, { payload: { chatId } });
    } catch (error) {
        yield put(deleteMessageFailed(getErrorMessage(error)));
    }
}

function* fetchEditMessage(action) {
    try {
        const { editMessageId, messageEdit } = action.payload.messageData;

        const { message: editedMessage } = yield call(editMessage, editMessageId, messageEdit);

        const messages = yield select(selectMessages);
        const newMessages = messages.map((message) =>
            message.messageId === editedMessage.messageId ? editedMessage : message);
        yield put(getMessages(newMessages));
    } catch (error) {
        console.error(error);
    }
}

function* fetchCreateChat(action) {
    try {
        const login = yield select(selectUserLogin);
        const { chatName } = action.payload;
        const response = yield call(createChat, chatName, login);
        if (response.ok) {
            yield put(addNewChat(response.chat));
        } else {
            console.error(response.errorMessage);
        }
    } catch (error) {
        console.error(error);
    }
}

function* fetchDeleteChat(action) {
    try {
        const { chatId } = action.payload;
        const response = yield call(deleteChat, chatId);
        if (response.ok) {
            yield put(deleteOldChat(chatId));
        }
    } catch (error) {
        console.error(error);
    }
}

function* fetchDeleteUserFromChat(action) {
    try {
        const { login, chatId } = action.payload;
        const response = yield call(deleteUserFromChat, login, chatId);
        if(response.ok) {
            yield put(deleteUnwanterUser(login, chatId));
        }
    } catch (error) {
        console.error(error);
    }
}

export function* chatSaga() {
    yield takeEvery(MESSAGES_REQUESTED, fetchRequestMessages);
    yield takeEvery(SEND_MESSAGE, fetchSendMessage);
    yield takeEvery(DELETE_MESSAGE, fetchDeleteMessage);
    yield takeEvery(EDIT_MESSAGE, fetchEditMessage);
    yield takeEvery(CREATE_CHAT, fetchCreateChat);
    yield takeEvery(DELETE_CHAT, fetchDeleteChat);
    yield takeEvery(DELETE_USER_FROM_CHAT, fetchDeleteUserFromChat);
}
