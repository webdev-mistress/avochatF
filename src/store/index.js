import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { userSaga } from '../middlewares/sagas';

import { contextReducer } from './context/reducer';
import { userReducer } from './user/reducer';
import { chatReducer } from './chat/reducer';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const storageState = localStorage.getItem('_avochat_F#A823_reduxState')
    ? JSON.parse(localStorage.getItem('_avochat_F#A823_reduxState')) : {};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combineReducers({
    user: userReducer,
    context: contextReducer,
    chat: chatReducer,
}), {
    user: storageState.user,
}, composeEnhancers(applyMiddleware(sagaMiddleware)));

store.subscribe(() => localStorage.setItem('_avochat_F#A823_reduxState', JSON.stringify(store.getState())));

sagaMiddleware.run(userSaga);

window.store = store;

export { store };
