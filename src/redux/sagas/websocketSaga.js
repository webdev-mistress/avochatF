import io from 'socket.io-client';
import { call, put, take, takeEvery } from 'redux-saga/effects';
import { END, eventChannel } from 'redux-saga';

import { requestMessages } from '@/redux/store/chat/actions';

function websocketInitChannel() {
    const socket = io(process.env.devMode === 'production' ? 'ws://localhost:4001' : 'ws://80.87.201.216:4001');
    socket.on('connect', () => console.log('connected!'));

    return eventChannel(emitter => {
        // eslint-disable-next-line no-unused-vars
        socket.on('sendMessage', ({ body }) => {
            const { chatId } = window.store.getState().chat.activeChat;
            emitter(requestMessages(chatId));
        });
        // eslint-disable-next-line no-unused-vars
        socket.on('editMessage', ({ body }) => {
            const { chatId } = window.store.getState().chat.activeChat;
            emitter(requestMessages(chatId));
        });
        // eslint-disable-next-line no-unused-vars
        socket.on('deleteMessage', ({ body }) => {
            const { chatId } = window.store.getState().chat.activeChat;

            emitter(requestMessages(chatId));
        });
        socket.onClose = () => emitter(END);

        return () => {
            socket.onmessage = null;
        };
    });
}

export function* websocketSaga() {
    yield takeEvery('WEBSOCKET_CONNECT', watchWebsocket);
}

export function* watchWebsocket() {
    const channel = yield call(websocketInitChannel);
    while (true) {
        const action = yield take(channel);
        yield put(action);
    }
}
