import { call, put, takeEvery, select } from 'redux-saga/effects';

import { SEND_MESSAGE, MESSAGES_REQUESTED } from '../constants/store';
import { errorMessages, getMessages, sendMessageFailed } from '../store/chat/actions';
import { selectMessages, selectActiveChatId } from '../store/chat/selectors';
import { selectUserId } from '../store/user/selectors';
import { getErrorMessage } from '../helpers/sagas';
import { getMessages as getMessagesFromApi, sendMessage } from '../api';

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

        yield sendMessage(userId, chatId, action.payload.messageText);
    } catch (error) {
        yield put(sendMessageFailed(getErrorMessage(error)));
    }
}

export function* chatSaga() {
    yield takeEvery(MESSAGES_REQUESTED, fetchRequestMessages);
    yield takeEvery(SEND_MESSAGE, fetchSendMessage);
}
