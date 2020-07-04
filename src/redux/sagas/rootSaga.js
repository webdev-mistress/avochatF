import { spawn, call, all } from 'redux-saga/effects';

import { userSaga } from './userSaga';
import { chatSaga } from './chatSaga';
import { websocketSaga } from '@/redux/sagas/websocketSaga';

export function* rootSaga() {
    const sagas = [ userSaga, chatSaga, websocketSaga ];

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
