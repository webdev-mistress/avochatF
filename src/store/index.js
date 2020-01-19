import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { mySaga } from '../middlewares/sagas';

import { contextReducer } from './context/reducer';
import { userReducer } from './user/reducer';

const rootReducer = combineReducers({
    user: userReducer,
    context: contextReducer,
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
);

export const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(mySaga);
