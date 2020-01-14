import { combineReducers, createStore } from 'redux';
import { contextReducer } from './context/reducer';
import { userReducer } from './user/reducer';

const rootReducer = combineReducers({
    user: userReducer,
    context: contextReducer,
});

export const store = createStore(
    rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
