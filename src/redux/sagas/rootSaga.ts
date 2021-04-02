import { spawn, call, all } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/types';
import { websocketSaga } from '@/redux/sagas/websocketSaga';
import { authSaga } from './authSaga';
import { userSaga } from './userSaga';
import { chatSaga } from './chatSaga';
import { messageSaga } from './messageSaga';

export function* rootSaga(): SagaIterator {
  const sagas = [userSaga, chatSaga, websocketSaga, authSaga, messageSaga];

  yield all(sagas.map(saga =>
    spawn(function* () {
      while (true) {
        try {
          yield call(saga);
        } catch (error) {
          console.error(error);
        }
      }
    })));
}
