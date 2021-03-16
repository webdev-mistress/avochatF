import { User, Chat, Auth } from '@/constants/store';
import {
  IAddNewChat,
  IAddNewChatName,
  IDeleteOldChat,
  IEditChatName,
  IEditCurrentUserRequest,
  IEditCurrentUserSucceed,
  IGetSelectedChat,
  ISignInUserData,
  ISucceededUserData,
  IUserData,
} from '@/types/store/userActions';
import {
  IAddUserToChat,
  IChangedFields,
  IChat,
  IChatData,
} from '@/types/store/chatActions';
import {
  ILogoutUser, IRemoveErrorMessage,
  ISignInFailedUser,
  ISignInUserRequest,
  ISignInUserSucceed, ISignUpFailedUser, ISignUpRequestUser,
} from '@/types/store/authActions';

export function signInUserRequest(user: ISignInUserData): ISignInUserRequest {
  return {
    type: Auth.SIGN_IN_REQUEST, payload: { user },
  };
}

export function signInUserSucceed(userData: ISucceededUserData): ISignInUserSucceed {
  return {
    type: Auth.SIGN_IN_SUCCEED, payload: { userData },
  };
}

export function signInUserFailed(errorMessage: string): ISignInFailedUser {
  return {
    type: Auth.SIGN_IN_FAILED, payload: { errorMessage },
  };
}

export function signUpUserFailed(errorMessage: string): ISignUpFailedUser {
  return {
    type: Auth.SIGN_UP_FAILED, payload: { errorMessage },
  };
}

export function requestLogoutUser(): ILogoutUser {
  return { type: Auth.LOGOUT };
}

export function removeErrorMessage(): IRemoveErrorMessage {
  return { type: Auth.REMOVE_AUTH_ERROR_MESSAGE };
}

export function signUpUserRequest(userData: IUserData): ISignUpRequestUser {
  return {
    type: Auth.SIGN_UP_REQUEST, payload: { userData },
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
    type: Auth.CONFIRM_USER_REQUEST, payload: { token },
  };
}
