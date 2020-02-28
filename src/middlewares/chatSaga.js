import { call, put, takeEvery, select } from 'redux-saga/effects';

import { SEND_MESSAGE, MESSAGES_REQUESTED, DELETE_MESSAGE } from '../constants/store';
import { errorMessages, getMessages, sendMessageFailed,
     deleteMessageFailed } from '../store/chat/actions';
import { selectMessages, selectActiveChatId } from '../store/chat/selectors';
import { selectUserId } from '../store/user/selectors';
import { getErrorMessage } from '../helpers/sagas';
import { getMessages as getMessagesFromApi, sendMessage, deleteMessage } from '../api';

function* fetchRequestMessages(action) {
    try {
        const state = yield select(state => state);
        const { messages } = yield call(getMessagesFromApi, action.payload.chatId);

        if(selectMessages(state).length !== messages.length) {
            yield put(getMessages(messages));
        }
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

export function* chatSaga() {
    yield takeEvery(MESSAGES_REQUESTED, fetchRequestMessages);
    yield takeEvery(SEND_MESSAGE, fetchSendMessage);
    yield takeEvery(DELETE_MESSAGE, fetchDeleteMessage);
}
