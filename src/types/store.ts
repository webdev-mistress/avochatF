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

export interface IActiveChat {
    info?: IChat,
    messageData?: IMessageData,
    isCreateChatSpin: boolean,
    isActiveChatSpin: boolean,
    editMessageId?: number,
    messageEdit?: string,
    chatMembersList?: IMembersData[],
}

export interface IChat {
    chatId: number,
    name: string,
    lastMessage: string,
    userOwnerId: number,
    messages?: IMessage[],
    chatMembersList?: IMembersData[],
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
    selectedChat?: IChat | null,
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
    payload: IChat,
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
        userId: number,
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
    type: Chat.DELETE_UNWANTED_USER,
    payload: {
        userId: number,
        chatId: number,
    }
}

export interface ICheckMembers {
    type: Chat.CHECK_MEMBERS,
    payload: {
        chatId: number,
    }
}

export interface ICheckMembersLoad {
    type: Chat.CHECK_MEMBERS_LOADED,
    payload: {
        data: IMembersData[],
    }
}

export interface IMembersData {
    userId: number,
    name: string,
    login: string,
    isOnline?: boolean,
}

export interface IGetSelectedChat {
    type: User.GET_SELECTED_CHAT,
    payload: {
        selectedChat: IChat,
    }
}

export interface IEditChatName {
    type: Chat.EDIT_CHAT_NAME,
    payload: {
        newChatName: string,
        chatId: number,
    }
}

export interface IAddNewChatName {
    type: Chat.ADD_NEW_CHAT_NAME,
    payload: {
        newChatName: string,
        chatId: number,
    }
}

export type ChatAction = IGetMessages | IGetActiveChat | IClearChat | IEditMessage | ICreateChat | IAddNewChat |
    ICheckMembersLoad | IDeleteUserFromChat | IDeleteUnwanterUser | IEditChatName | IAddNewChatName;

export type UserAction = IRequestUser | IGetUserSucceeded | ILogoutUser | IRemoveErrorMessage |
    IRequestCreateUser | IFailedUser | IAddNewChat | IDeleteOldChat | IGetSelectedChat | IEditChatName | IAddNewChatName;

