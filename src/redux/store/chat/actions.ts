import { Chat } from '@/constants/store';
import {
    IAddNewChatName,
    IChat, ICheckMembers,
    IClearChat, ICreateChat, IDeleteChat,
    IDeleteMessage, IDeleteMessageFailed, IDeleteUnwanterUser, IDeleteUserFromChat, IEditChatName, IEditMessage,
    IErrorMessages, IGetActiveChat,
    IGetMessages, IMembersData,
    IMessage, IMessageData,
    IRequestMessages,
    ISendMessage,
    ISendMessageFailed
} from '@/types/store';

export function getMessages(messages: IMessage[]): IGetMessages {
    return {
        type: Chat.MESSAGES_SUCCEEDED, payload: messages,
    };
}

export function requestMessages(chatId: number): IRequestMessages {
    return {
        type: Chat.MESSAGES_REQUESTED, payload: { chatId },
    };
}

export function errorMessages(errorMessage: any): IErrorMessages {
    return {
        type: Chat.MESSAGES_FAILED, payload: { errorMessage },
    };
}

export function sendMessage(messageText: string): ISendMessage {
    return {
        type: Chat.SEND_MESSAGE, payload: { messageText },
    };
}

export function sendMessageFailed(errorMessage: any): ISendMessageFailed {
    return {
        type: Chat.SEND_MESSAGE_FAILED, payload: { errorMessage },
    };
}

export function deleteMessage(messageId: number): IDeleteMessage {
    return {
        type: Chat.DELETE_MESSAGE, payload: { messageId },
    };
}

export function deleteMessageFailed(errorMessage: any): IDeleteMessageFailed {
    return {
        type: Chat.DELETE_MESSAGE_FAILED, payload: { errorMessage },
    };
}

export function getActiveChat(activeChat: IChat): IGetActiveChat {
    return {
        type: Chat.GET_ACTIVE_CHAT, payload: activeChat,
    };
}

export function clearChat(): IClearChat {
    return {
        type: Chat.CLEAR_CHAT,
    };
}

export function editMessage(messageData: IMessageData): IEditMessage {
    return {
        type: Chat.EDIT_MESSAGE, payload: { messageData },
    };
}

export function createChat(chatName: string): ICreateChat {
    return {
        type: Chat.CREATE_CHAT, payload: { chatName },
    };
}

export function deleteChat(chatId: number): IDeleteChat {
    return {
        type: Chat.DELETE_CHAT, payload: { chatId },
    };
}

export function deleteUserFromChat(userId: number, chatId: number): IDeleteUserFromChat {
    return {
        type: Chat.DELETE_USER_FROM_CHAT, payload: { userId, chatId },
    };
}

export function checkChatMembers(chatId: number): ICheckMembers {
    return {
        type: Chat.CHECK_MEMBERS, payload: { chatId },
    };
}

export function checkMembersLoaded(data: IMembersData[]) {
    return {
        type: Chat.CHECK_MEMBERS_LOADED,
        payload: {
            data: data,
        },
    };
}

export function deleteUnwanterUser(userId: number, chatId: number): IDeleteUnwanterUser {
    return {
        type: Chat.DELETE_UNWANTED_USER, payload: { userId, chatId },
    };
}

export function editOldChatName(newChatName: string, chatId: number): IEditChatName {
    return {
        type: Chat.EDIT_CHAT_NAME,
        payload: {
            newChatName,
            chatId,
        },
    };
}

export function addNewChatName(newChatName: string, chatId: number): IAddNewChatName {
    return {
        type: Chat.ADD_NEW_CHAT_NAME, payload: { newChatName, chatId },
    };
}
