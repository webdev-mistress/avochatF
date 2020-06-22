import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from '../sagas/rootSaga';

import { contextReducer } from './context/reducer';
import { userReducer } from './user/reducer';
import { chatReducer } from './chat/reducer';

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
    context: contextReducer,
    chat: chatReducer,
}), {
    chat: storageState.chat,
    user: storageState.user,
}, composeEnhancers(applyMiddleware(sagaMiddleware)));

store.subscribe(() => localStorage.setItem(localStorageId, JSON.stringify(store.getState())));

sagaMiddleware.run(rootSaga);

window.store = store;

export { store };
