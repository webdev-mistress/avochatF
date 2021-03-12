import { User, Chat } from '@/constants/store';
import {
  IAddNewChat,
  IAddNewChatName,
  IAddNewUserValue,
  IDeleteOldChat,
  IEditChatName,
  IEditOldUser,
  IFailedUser,
  IGetSelectedChat,
  IGetUserSucceeded,
  ILogoutUser,
  IRemoveErrorMessage,
  IRequestCreateUser,
  IRequestUser,
  IRequestUserData,
  ISucceededUserData,
  IUserData,
} from '@/types/store/userActions';
import {
  IAddUserToChat,
  IChangedFields,
  IChat,
  IChatData,
} from '@/types/store/chatActions';

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

export function getSelectedChat(selectedChat: IChat): IGetSelectedChat {
  return {
    type: User.GET_SELECTED_CHAT, payload: { selectedChat },
  };
}

export function editOldChatName(name: string, id: number): IEditChatName {
  return {
    type: Chat.EDIT_CHAT_NAME,
    payload: {
      name,
      id,
    },
  };
}

export function addNewChatName(name: string, id: number): IAddNewChatName {
  return {
    type: Chat.ADD_NEW_CHAT_NAME, payload: { name, id },
  };
}

export function editOldUser(changedFields: IChangedFields): IEditOldUser {
  return {
    type: User.EDIT_OLD_USER, payload: changedFields,
  };
}

export function addNewUserValue(changedFields: IChangedFields): IAddNewUserValue {
  return {
    type: User.ADD_NEW_USER_VALUE, payload: { changedFields },
  };
}

export function requestConfirmUser(token: string) {
  return {
    type: User.CONFIRM_REQUESTED, payload: { token },
  };
}
