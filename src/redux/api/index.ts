import { getResource } from '@/helpers/api';
import { IRequestUserData } from '@/types/store';
import {
    IAddUserToChatSaga, ICkeckMembersSaga,
    ICreateChatSaga,
    ICreateUserSaga, IDeleteChatSaga,
    IDeleteMessageSaga, IDeleteUserFromChatSaga,
    IEditMessageSaga,
    IGetMessagesSaga,
    IGetUserSaga,
    ISendMessageSaga
} from '@/types/sagas';

const PREFIX_USER = '/user';
const PREFIX_MESSAGES = '/messages';
const PREFIX_CHAT = '/chat';

/* user */
export const getUser = function (user: IRequestUserData): Promise<IGetUserSaga> {
    return getResource(`${PREFIX_USER}/getUser`, user);
};

export const createUser = function (
        name: string,
        login: string,
        password1: string,
        password2: string
    ): Promise<ICreateUserSaga> {
        return getResource(`${PREFIX_USER}/createUser`, { name, login, password1, password2 });
};

/* messages */
export const getMessages = function (chatId: number): Promise<IGetMessagesSaga> {
    return getResource(`${PREFIX_MESSAGES}/getMessages`, { chatId });
};

export const sendMessage = function (login: string, chatId: number, message: string): Promise<ISendMessageSaga> {
    return getResource(`${PREFIX_MESSAGES}/sendMessage`, ({ login, chatId, message }));
};

export const deleteMessage = function (messageId: number): Promise<IDeleteMessageSaga> {
    return getResource(`${PREFIX_MESSAGES}/deleteMessage`, { messageId });
};

export const editMessage = function (messageId: number, message: string): Promise<IEditMessageSaga> {
    return getResource(`${PREFIX_MESSAGES}/editMessage`, { messageId, message });
};

/* chat */
export const createChat = function (chatName: string, login: string): Promise<ICreateChatSaga> {
    return getResource(`${PREFIX_CHAT}/createChat`, { chatName, login });
};

export const deleteChat = function (chatId: number): Promise<IDeleteChatSaga> {
    return getResource(`${PREFIX_CHAT}/deleteChat`, { chatId });
};

export const addUserToChat = function (login: string, chatId: number): Promise<IAddUserToChatSaga> {
    return getResource(`${PREFIX_CHAT}/addUserToChat`, { login, chatId });
};

export const deleteUserFromChat = function (userId: number, chatId: number): Promise<IDeleteUserFromChatSaga> {
    return getResource(`${PREFIX_CHAT}/deleteUserFromChat`, { userId, chatId });
};

export const checkMembers = function (chatId: number): Promise<ICkeckMembersSaga> {
    return getResource(`${PREFIX_CHAT}/getUsers`, { chatId });
};
