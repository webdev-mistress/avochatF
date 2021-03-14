// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import io from 'socket.io-client';
import { call, put, take, takeEvery } from 'redux-saga/effects';
import { END, eventChannel } from 'redux-saga';
import { sendNotification } from '@/helpers';
import { requestMessages } from '@/redux/store/chat/actions';
import { selectActiveChatId } from '@/redux/store/chat/selectors';
import { selectUserId } from '@/redux/store/user/selectors';

function websocketInitChannel() {
  const url = process.env.NODE_ENV === 'development'
    ? 'ws://localhost:4001'
    : 'ws://80.87.201.216:4001';
  const socket = io(url);
  socket.on('connect', () => {
    socket.emit('online', {
      userId: selectUserId(window.store.getState()),
    });
  });

  return eventChannel(emitter => {
    socket.on('sendMessage', ({ body }) => {
      const store = window.store.getState();
      const chatId = selectActiveChatId(store);
      if (chatId) {
        emitter(requestMessages(chatId));
      }

      if (body.author.login !== store.user.login) {
        sendNotification(`Message from ${body.author.name}`, {
          body: `${body.message}`,
          icon: 'assets/avo.ico',
          dir: 'auto',
        });
      }
    });
    socket.on('editMessage', () => {
      const store = window.store.getState();
      const chatId = selectActiveChatId(store);
      if (chatId) {
        emitter(requestMessages(chatId));
      }
    });
    socket.on('deleteMessage', () => {
      const store = window.store.getState();
      const chatId = selectActiveChatId(store);

      if (chatId) {
        emitter(requestMessages(chatId));
      }
    });
    socket.onClose = () => emitter(END);

    return () => {
      socket.onmessage = null;
    };
  });
}

export function* websocketSaga(): any {
  yield takeEvery('WEBSOCKET_CONNECT', watchWebsocket);
}

export function* watchWebsocket(): any {
  const channel = yield call(websocketInitChannel);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}
