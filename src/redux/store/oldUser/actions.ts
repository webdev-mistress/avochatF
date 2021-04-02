export const e = 10;
// import {
// User,
// Chat,
// Auth } from '@/constants/store';
// import {
// IAddNewChat,
// IAddNewChatName,
// IChangeUserData,
// IDeleteOldChat,
// IEditChatName,
// IEditCurrentUserRequest,
// IEditCurrentUserSucceed,
// IGetSelectedChat,
// ISignInUserData,
// ISucceededUserData,
// IUserData,
// } from '@/types/store/userActions';
// import {
// IAddUserToChat,
// IChat,
// IChatData,
// } from '@/types/store/chatActions';
// import {
//   IChangePasswordData, IChangePasswordRequest, IChangePasswordSucceed,
//   ILogoutUser, IRemoveErrorMessage,
//   ISignInFailedUser,
//   // ISignInUserRequest,
//   // ISignInUserSucceed,
//   ISignUpFailedUser, ISignUpRequestUser,
// } from '@/types/store/authActions';

// export function signInUserRequest(user: ISignInUserData): ISignInUserRequest {
//   return {
//     // signInRequest
//     type: Auth.SIGN_IN_REQUEST, payload: { user },
//   };
// }
//
// export function signInUserSucceed(userData: ISucceededUserData): ISignInUserSucceed {
//   // signInSucceed
//   return {
//     type: Auth.SIGN_IN_SUCCEED, payload: { userData },
//   };
// }

// export function changePasswordRequest( // changePasswordRequest
//   passwordData: IChangePasswordData): IChangePasswordRequest {
//   return {
//     type: Auth.CHANGE_PASSWORD_REQUEST, payload: { passwordData },
//   };
// }

// export function changePasswordSucceed(): IChangePasswordSucceed {
//   // changePasswordSucceed
//   return {
//     type: Auth.CHANGE_PASSWORD_SUCCEED,
//   };
// }
//
// export function signInUserFailed(errorMessage: string): ISignInFailedUser {
//   // signInFailed
//   return {
//     type: Auth.SIGN_IN_FAILED, payload: { errorMessage },
//   };
// }

// export function signUpUserFailed(errorMessage: string): ISignUpFailedUser {
//   // signUpFailed
//   return {
//     type: Auth.SIGN_UP_FAILED, payload: { errorMessage },
//   };
// }
//
// export function requestLogoutUser(): ILogoutUser {
//   return { type: Auth.LOGOUT }; // logout
// }
//
// export function removeErrorMessage(): IRemoveErrorMessage {
//   // removeAuthErrorMessage
//   return { type: Auth.REMOVE_AUTH_ERROR_MESSAGE };
// }

// export function signUpUserRequest(userData: IUserData): ISignUpRequestUser {
//   // signUpRequest
//   return {
//     type: Auth.SIGN_UP_REQUEST, payload: { userData },
//   };
// }

// export function addUserToChat(chatData: IChatData): IAddUserToChat {
//   // addUserToChatRequest
//   return {
//     type: User.ADD_USER_TO_CHAT, payload: { chatData },
//   };
// }
//
// export function addNewChat(chat: IChat): IAddNewChat {
//   // createChatSucceed
//   return {
//     type: Chat.ADD_NEW_CHAT, payload: { chat },
//   };
// }
//
// export function deleteOldChat(chatId: number): IDeleteOldChat { // deleteChatSucceed
//   return {
//     type: Chat.DELETE_OLD_CHAT, payload: { chatId },
//   };
// }

// export function getSelectedChat(selectedChat: IChat): IGetSelectedChat { // getSelectedChat
//   return {
//     type: User.GET_SELECTED_CHAT, payload: { selectedChat },
//   };
// }

// export function editOldChatName(name: string, id: number): IEditChatName {
//   // editChatNameRequest
//   return {
//     type: Chat.EDIT_CHAT_NAME,
//     payload: {
//       name,
//       id,
//     },
//   };
// }

// export function addNewChatName(name: string, id: number): IAddNewChatName {
//   // editChatNameSucceed
//   return {
//     type: Chat.ADD_NEW_CHAT_NAME, payload: { name, id },
//   };
// }
//
// export function editCurrentUserRequest( // editCurrentUserRequest
//   changedField: IChangeUserData,
// ): IEditCurrentUserRequest {
//   return {
//     type: User.EDIT_CURRENT_USER_REQUEST, payload: changedField,
//   };
// }

// export function editCurrentUserSucceed( // editCurrentUserSucceed
//   changedField: IChangeUserData,
// ): IEditCurrentUserSucceed {
//   return {
//     type: User.EDIT_CURRENT_USER_SUCCEED, payload: { changedField },
//   };
// }

// export function requestConfirmUser(token: string): any {
//   return {
//     type: Auth.CONFIRM_USER_REQUEST, payload: { token },
//   };
// }
