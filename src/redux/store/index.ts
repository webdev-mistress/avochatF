// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import _ from 'lodash';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '@/redux/sagas/rootSaga';
import { userReducer } from '@/redux/store/user/reducer';
import { chatReducer } from '@/redux/store/chat/reducer';
import { uiReducer } from '@/redux/store/ui/reducer';

const localStorageId = '_avochat_F#A823_reduxState';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const storageState = localStorage.getItem(localStorageId)
  ? JSON.parse(localStorage.getItem(localStorageId)) : {};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combineReducers({
  user: userReducer,
  activeChat: chatReducer,
  ui: uiReducer,
}), {
  activeChat: storageState.activeChat,
  user: _.omit(storageState.user, ['isAuthSpin']),
}, composeEnhancers(applyMiddleware(sagaMiddleware)));

store.subscribe(
  () => localStorage.setItem(localStorageId, JSON.stringify(store.getState())),
);

sagaMiddleware.run(rootSaga);

window.store = store;

export { store };
