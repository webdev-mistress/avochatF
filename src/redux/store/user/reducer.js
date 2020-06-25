import _ from 'lodash';

import {
    USER_FETCH_SUCCEEDED, USER_FETCH_FAILED, USER_LOGOUT,
    REMOVE_AUTH_ERROR_MESSAGE, ADD_NEW_CHAT, DELETE_OLD_CHAT, DELETE_UNWANTED_USER
} from '../../../constants/store';

const initialState = {
    isAuth: false,
};

export function userReducer(state = initialState, action) {
    const cloneState = _.cloneDeep(state);

    switch (action.type) {
        case USER_FETCH_SUCCEEDED:
            if(action.payload.userData.isAuth) {
                delete cloneState.errorMessage;
            }

            return {
                ...cloneState,
                ...action.payload.userData,
            };
        case REMOVE_AUTH_ERROR_MESSAGE:
            delete cloneState.errorMessage;

            return cloneState;
        case USER_FETCH_FAILED:
            return {
                isAuth: false,
                errorMessage: action.payload.errorMessage,
            };
        case ADD_NEW_CHAT:
            const { chat } = action.payload;

            return {
                ...state,
                chats: [...state.chats, chat ],
            };
        case DELETE_OLD_CHAT:
            const { chatId } = action.payload;

            return {
                ...state,
                chats: state.chats.filter(chat => chat.chatId !== chatId),
            };
        case USER_LOGOUT:
            return initialState;
        case DELETE_UNWANTED_USER:
            return {
                ...state,
            };
        default:
            return state;
    }
}
