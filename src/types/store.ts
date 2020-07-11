import { Chat, User } from '@/constants/store';

export interface IAuthor {
    login: string,
    name: string,
    userId: number,
}

export interface IMessage {
    author: IAuthor,
    dateChange: string | null,
    dateCreate: string,
    message: string,
    messageId: number,
}

export interface IActiveChatInfo {
    chatId: number,
    name: string,
    userOwnerId: number,
    messages: IMessage[],
}

export interface IActiveChat {
    info?: IActiveChatInfo,
    messageData?: IMessageData,
    isCreateChatSpin: boolean,
    isActiveChatSpin: boolean,
    editMessageId?: number,
    messageEdit?: string,
}

export interface IChat {
    chatId: number,
    name: string,
    userOwnerId: number,
}

export interface IUser {
    isAuth: boolean,
    isAuthSpin: boolean,
    userId?: number,
    name?: string,
    login?: string,
    chats: IChat[],
    userData?: ISucceededUserData,
    errorMessage?: string,
}

export interface IMessageData {
    editMessageId: number,
    messageEdit: string,
}

export interface IRequestUserData {
    login: string,
    password: string,
}

export interface ISucceededUserData {
    userId: number,
    name: string,
    login: string,
    chats: IChat[],
}

export interface IUserData {
    name: string,
    login: string,
    password1: string,
    password2: string,
}

export interface IChatData {
    login: string,
    selectedChatId: number,
}

// chatAction
export interface IGetMessages {
    type: Chat.MESSAGES_SUCCEEDED,
    payload: IMessage[],
}

export interface IRequestMessages {
    type: Chat.MESSAGES_REQUESTED,
    payload: {
        chatId: number,
    }
}

export interface IErrorMessages {
    type: Chat.MESSAGES_FAILED,
    payload: {
        errorMessage: any,
    },
}

export interface ISendMessage {
    type: Chat.SEND_MESSAGE,
    payload: {
        messageText: string,
    },
}

export interface ISendMessageFailed {
    type: Chat.SEND_MESSAGE_FAILED,
    payload: {
        errorMessage: any,
    },
}

export interface IDeleteMessage {
    type: Chat.DELETE_MESSAGE,
    payload: {
        messageId: number,
    },
}

export interface IDeleteMessageFailed {
    type: Chat.DELETE_MESSAGE_FAILED,
    payload: {
        errorMessage: any,
    }
}

export interface IGetActiveChat {
    type: Chat.GET_ACTIVE_CHAT,
    payload: IActiveChatInfo,
}

export interface IClearChat {
    type: Chat.CLEAR_CHAT,
}

export interface IEditMessage {
    type: Chat.EDIT_MESSAGE,
    payload: {
        messageData: IMessageData,
    }
}

export interface ICreateChat {
    type: Chat.CREATE_CHAT,
    payload: {
        chatName: string,
    }
}

export interface IDeleteChat {
    type: Chat.DELETE_CHAT,
    payload: {
        chatId: number,
    }
}

export interface IDeleteUserFromChat {
    type: Chat.DELETE_USER_FROM_CHAT,
    payload: {
        login: string,
        chatId: number,
    }
}

// userAction
export interface IRequestUser {
    type: User.FETCH_REQUESTED,
    payload: {
        user: IRequestUserData,
    }
}

export interface IGetUserSucceeded {
    type: User.FETCH_SUCCEEDED,
    payload: {
        userData: ISucceededUserData,
    }
}

export interface IFailedUser {
    type: User.FETCH_FAILED,
    payload: {
        errorMessage: string,
    }
}

export interface ILogoutUser {
    type: User.LOGOUT,
}

export interface IRemoveErrorMessage {
    type: User.REMOVE_AUTH_ERROR_MESSAGE,
}

export interface IRequestCreateUser {
    type: User.CREATE_REQUESTED,
    payload: {
        userData: IUserData,
    }
}

export interface IAddUserToChat {
    type: User.ADD_USER_TO_CHAT,
    payload: {
        chatData: IChatData,
    }
}

export interface IAddNewChat {
    type: Chat.ADD_NEW_CHAT,
    payload: {
        chat: IChat,
    }
}

export interface IDeleteOldChat {
    type: Chat.DELETE_OLD_CHAT,
    payload: {
        chatId: number,
    }
}

export interface IDeleteUnwanterUser {
    type: User.DELETE_UNWANTED_USER,
    payload: {
        login: string,
        chatId: number,
    }
}

export type ChatAction = IGetMessages | IGetActiveChat | IClearChat | IEditMessage | ICreateChat | IAddNewChat;

export type UserAction = IRequestUser | IGetUserSucceeded | ILogoutUser | IRemoveErrorMessage |
    IRequestCreateUser | IFailedUser | IAddNewChat | IDeleteOldChat | IDeleteUnwanterUser;

