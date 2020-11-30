import _ from 'lodash';
import { User, Chat } from '@/constants/store';
import { IUser, UserAction } from '@/types/store';

const initialState: IUser = {
    userId: 0,
    name: '',
    login: '',
    isAuth: false,
    isAuthSpin: false,
    chats: [],
    selectedChat: null,
};

export function userReducer(state = initialState, action: UserAction) {
    const cloneState = _.cloneDeep(state);

    switch (action.type) {
        case User.FETCH_REQUESTED:
        case User.CREATE_REQUESTED:
            return {
                ...state,
                isAuthSpin: true,
            };
        case User.FETCH_SUCCEEDED:
            return {
                ...cloneState,
                ...action.payload.userData,
                isAuth: true,
                isAuthSpin: false,
            };
        case User.REMOVE_AUTH_ERROR_MESSAGE:
            delete cloneState.errorMessage;

            return cloneState;
        case User.FETCH_FAILED:
            return {
                isAuth: false,
                isAuthSpin: false,
                errorMessage: action.payload.errorMessage,
            };
        case Chat.ADD_NEW_CHAT:
            const { chat } = action.payload;

            return {
                ...state,
                chats: [...state.chats, chat ],
            };
        case Chat.DELETE_OLD_CHAT:
            const { chatId } = action.payload;

            return {
                ...state,
                chats: state.chats.filter(chat => chat.chatId !== chatId),
            };
        case User.LOGOUT:
            return initialState;
        case User.GET_SELECTED_CHAT:
            return {
                ...state,
                selectedChat: action.payload.selectedChat,
            };
        case Chat.EDIT_CHAT_NAME:
            console.log(action.payload.newChatName, action.payload.chatId);

            return {
                ...state,
                selectedChat: {
                    ...state.selectedChat,
                    name: action.payload.newChatName,
                },
            };
        case Chat.ADD_NEW_CHAT_NAME: {
            const newChats = state.chats
                .map(chat => chat.chatId === action.payload.chatId
                    ? { ...chat, name: action.payload.newChatName }
                    : chat);

            return {
                ...state,
                chats: newChats,
            };
        }
        case User.ADD_NEW_USER_VALUE:
            return {
                ...state,
                ...action.payload.changedFields,
            };
        default:
            return state;
    }
}
