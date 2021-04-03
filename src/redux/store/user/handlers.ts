import {
  EditUserData,
  ISucceededUserData,
  IUser,
  IUserProfileData,
} from '@/redux/store/user/types';
// import { ChatData, IChat } from '@/redux/store/chat/types';
import { INITIAL_STATE } from '@/redux/store/user/reducer';

// for chatReducer
// export const deleteChatSucceedHandler = (
//   state: IUser,
//   chatId: number,
// ): IUser => ({
//   ...state,
//   chats: state.chats.filter(chat => chat.id !== chatId),
// });

// for chatReducer
// export const createChatSucceedHandler = (
//   state: IUser,
//   chat: IChat,
// ): IUser => ({
//   ...state,
//   chats: [
//     ...state.chats,
//     chat,
//   ],
// });

// for chatReducer
// export const editChatNameRequestHandler = (
//   state: IUser,
//   chatData: ChatData,
// ): IUser => ({
//   ...state,
//   selectedChat: state.selectedChat ? {
//     ...state.selectedChat,
//     name: chatData.name,
//   } : null,
// });

// for chatReducer
// export const editChatNameSucceedHandler = (
//   state: IUser,
//   chatData: ChatData,
// ): IUser => {
//   const newChatList = state.chats
//     .map((chat) => chat.id === chatData.id
//       ? { ...chat, name: chatData.name }
//       : chat);
//   return ({
//     ...state,
//     selectedChat: state.selectedChat ? {
//       ...state.selectedChat,
//       ...chatData,
//     } : null,
//     chats: newChatList,
//   });
// };

// for chatReducer
// export const getSelectedChatHandler = (
//   state: IUser,
//   selectedChat: IChat,
// ): IUser => ({
//   ...state,
//   selectedChat: selectedChat,
// });

export const logoutHandler = (): IUser => INITIAL_STATE;

// for uiReducer
// export const editCurrentUserRequestHandler = (
//   state: IUser,
// ): IUser => ({
//   ...state,
//   isEditCurrentUser: true,
// });

// done
export const editCurrentUserSucceedHandler = (
  state: IUser,
  editUserData: EditUserData,
): IUser => ({
  ...state,
  userProfileData: state.userProfileData ? {
    ...state.userProfileData,
    ...editUserData,
  } : state.userProfileData,
});

// for uiReducer
// export const signAllRequestHandler = (
//   state: IUser,
// ): IUser => ({
//   ...state,
//   isAuthSpin: true,
// });

// half done, everything else is chatReducer and AuthReducer
export const signInSucceedHandler = (
  // chats for chatReducer
  state: IUser,
  userData: IUserProfileData,
): IUser => ({
  ...state,
  ...userData,
  isAuthUser: true,
  // for uiReducer
  // isAuthSpin: false,
});

// for uiReducer
// export const removeAuthErrorMessageHandler = (
//   state: IUser,
// ): IUser => ({
//   ...state,
//   errorMessage: '',
// });

// half done, everything else is chatReducer and AuthReducer
export const signAllFailedHandler = (
  state: IUser,
  // for uiReducer
  // errorMessage: string,
): IUser => ({
  ...state,
  isAuthUser: false,
  // for uiReducer
  // isAuthSpin: false,
  // errorMessage: errorMessage,
});
