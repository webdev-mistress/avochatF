import { User, Chat } from '@/constants/store';
import {
    IAddNewChat,
    IAddUserToChat, IChat,
    IChatData, IDeleteOldChat, IDeleteUnwanterUser,
    IFailedUser,
    IGetUserSucceeded, ILogoutUser, IRemoveErrorMessage, IRequestCreateUser,
    IRequestUser,
    IRequestUserData,
    ISucceededUserData,
    IUserData
} from '@/types/store';

export function requestUser(user: IRequestUserData): IRequestUser {
    return {
        type: User.FETCH_REQUESTED, payload: { user },
    };
}

export function getUserSucceeded(userData: ISucceededUserData): IGetUserSucceeded {
    return {
        type: User.FETCH_SUCCEEDED, payload: { userData },
    };
}

export function failedUser(errorMessage: string): IFailedUser {
    return {
        type: User.FETCH_FAILED, payload: { errorMessage },
    };
}

export function logoutUser(): ILogoutUser {
    return { type: User.LOGOUT };
}

export function removeErrorMessage(): IRemoveErrorMessage {
    return { type: User.REMOVE_AUTH_ERROR_MESSAGE };
}

export function requestCreateUser(userData: IUserData): IRequestCreateUser {
    return {
        type: User.CREATE_REQUESTED, payload: { userData },
    };
}

export function addUserToChat(chatData: IChatData): IAddUserToChat {
    return {
        type: User.ADD_USER_TO_CHAT, payload: { chatData },
    };
}

export function addNewChat(chat: IChat): IAddNewChat {
    return {
        type: Chat.ADD_NEW_CHAT, payload: { chat },
    };
}

export function deleteOldChat(chatId: number): IDeleteOldChat {
    return {
        type: Chat.DELETE_OLD_CHAT, payload: { chatId },
    };
}

export function deleteUnwanterUser(login: string, chatId: number): IDeleteUnwanterUser {
    return {
        type: User.DELETE_UNWANTED_USER, payload: { login, chatId },
    };
}
