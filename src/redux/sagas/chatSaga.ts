import { call, put, takeEvery, select } from 'redux-saga/effects';

import { Chat } from '@/constants/store';
import { errorMessages, getMessages, sendMessageFailed,
     deleteMessageFailed } from '@/redux/store/chat/actions';
import { selectActiveChatId, selectMessages } from '@/redux/store/chat/selectors';
import { selectUserLogin } from '@/redux/store/user/selectors';
import { getErrorMessage } from '@/helpers/sagas';
import { getMessages as getMessagesFromApi, sendMessage, deleteMessage,
    editMessage, createChat, deleteChat, deleteUserFromChat } from '@/redux/api';
import { addNewChat, deleteOldChat, deleteUnwanterUser } from '@/redux/store/user/actions';
import {
    ICreateChat,
    IDeleteChat,
    IDeleteMessage, IDeleteUserFromChat,
    IEditMessage,
    IMessage,
    IRequestMessages,
    ISendMessage
} from '@/types/store';
import {
    ICreateChatSaga,
    IDeleteChatSaga,
    IDeleteUserFromChatSaga,
    IGetMessagesSaga,
    ISendMessageSaga
} from '@/types/sagas';

function* requestMessages(chatId: number) {
    try {
        const response: IGetMessagesSaga = yield call(getMessagesFromApi, chatId);

        if (!response.data || !response.ok) {
            throw response.message;
        }

        yield put(getMessages(response.data));
    } catch (error) {
        yield put(errorMessages(getErrorMessage(error)));
    }
}

function* fetchRequestMessages(action: IRequestMessages) {
    yield call(requestMessages, action.payload.chatId);
}

function* fetchSendMessage(action: ISendMessage) {
    try {
        const login = yield select(selectUserLogin);
        const chatId = yield select(selectActiveChatId);

        const response: ISendMessageSaga = yield call(sendMessage, login, chatId, action.payload.messageText);

        if (!response.data || !response.ok) {
            throw response.message;
        }
        yield call(requestMessages, chatId);
    } catch (error) {
        yield put(sendMessageFailed(getErrorMessage(error)));
    }
}

function* fetchDeleteMessage(action: IDeleteMessage) {
    const state = yield select(state => state);

    try {
       yield call(deleteMessage, action.payload.messageId);
       const chatId = selectActiveChatId(state);

        yield call(requestMessages, chatId);
    } catch (error) {
        yield put(deleteMessageFailed(getErrorMessage(error)));
    }
}

function* fetchEditMessage(action: IEditMessage) {
    try {
        const { editMessageId, messageEdit } = action.payload.messageData;

        const response: ISendMessageSaga = yield call(editMessage, editMessageId, messageEdit);

        if (!response.data || !response.ok) {
            throw response.message;
        }

        const messages = yield select(selectMessages);
        const newMessages = messages.map((message: IMessage) =>
            message.messageId === editMessageId ? response.data : message);
        yield put(getMessages(newMessages));
    } catch (error) {
        console.error(error);
    }
}

function* fetchCreateChat(action: ICreateChat) {
    try {
        const login = yield select(selectUserLogin);
        const { chatName } = action.payload;
        const response: ICreateChatSaga = yield call(createChat, chatName, login);

        if (!response.data || !response.ok) {
            throw response.message;
        }

        yield put(addNewChat(response.data));
    } catch (error) {
        console.error(error);
    }
}

function* fetchDeleteChat(action: IDeleteChat) {
    try {
        const { chatId } = action.payload;
        const response: IDeleteChatSaga = yield call(deleteChat, chatId);

        if (response.ok) {
            yield put(deleteOldChat(chatId));
        }
    } catch (error) {
        console.error(error);
    }
}

function* fetchDeleteUserFromChat(action: IDeleteUserFromChat) {
    try {
        const { login, chatId } = action.payload;
        const response: IDeleteUserFromChatSaga = yield call(deleteUserFromChat, login, chatId);
        if (response.ok) {
            yield put(deleteUnwanterUser(login, chatId));
        }
    } catch (error) {
        console.error(error);
    }
}

export function* chatSaga() {
    yield takeEvery(Chat.MESSAGES_REQUESTED, fetchRequestMessages);
    yield takeEvery(Chat.SEND_MESSAGE, fetchSendMessage);
    yield takeEvery(Chat.DELETE_MESSAGE, fetchDeleteMessage);
    yield takeEvery(Chat.EDIT_MESSAGE, fetchEditMessage);
    yield takeEvery(Chat.CREATE_CHAT, fetchCreateChat);
    yield takeEvery(Chat.DELETE_CHAT, fetchDeleteChat);
    yield takeEvery(Chat.DELETE_USER_FROM_CHAT, fetchDeleteUserFromChat);
}
