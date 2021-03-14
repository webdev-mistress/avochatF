import { User, Chat } from '@/constants/store';
import {
  IAddNewChat,
  IAddNewChatName,
  IDeleteOldChat,
  IEditChatName,
  IEditCurrentUserRequest,
  IEditCurrentUserSucceed,
  IGetSelectedChat,
  ILogoutUser,
  IRemoveErrorMessage,
  ISignInFailedUser,
  ISignInUserData,
  ISignInUserRequest,
  ISignInUserSucceed,
  ISignUpFailedUser,
  ISignUpRequestUser,
  ISucceededUserData,
  IUserData,
} from '@/types/store/userActions';
import {
  IAddUserToChat,
  IChangedFields,
  IChat,
  IChatData,
} from '@/types/store/chatActions';

export function signInUserRequest(user: ISignInUserData): ISignInUserRequest {
  return {
    type: User.SIGN_IN_REQUEST, payload: { user },
  };
}

export function signInUserSucceed(userData: ISucceededUserData): ISignInUserSucceed {
  return {
    type: User.SIGN_IN_SUCCEED, payload: { userData },
  };
}

export function signInUserFailed(errorMessage: string): ISignInFailedUser {
  return {
    type: User.SIGN_IN_FAILED, payload: { errorMessage },
  };
}

export function signUpUserFailed(errorMessage: string): ISignUpFailedUser {
  return {
    type: User.SIGN_UP_FAILED, payload: { errorMessage },
  };
}

export function requestLogoutUser(): ILogoutUser {
  return { type: User.LOGOUT };
}

export function removeErrorMessage(): IRemoveErrorMessage {
  return { type: User.REMOVE_AUTH_ERROR_MESSAGE };
}

export function signUpUserRequest(userData: IUserData): ISignUpRequestUser {
  return {
    type: User.SIGN_UP_REQUEST, payload: { userData },
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

export function editCurrentUserRequest(
  changedFields: IChangedFields,
): IEditCurrentUserRequest {
  return {
    type: User.EDIT_CURRENT_USER_REQUEST, payload: changedFields,
  };
}

export function editCurrentUserSucceed(
  changedFields: IChangedFields,
): IEditCurrentUserSucceed {
  return {
    type: User.EDIT_CURRENT_USER_SUCCEED, payload: { changedFields },
  };
}

export function requestConfirmUser(token: string): any {
  return {
    type: User.CONFIRM_USER_REQUEST, payload: { token },
  };
}
