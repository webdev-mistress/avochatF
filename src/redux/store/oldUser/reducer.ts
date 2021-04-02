// import _ from 'lodash';
// import { User, Chat, Auth } from '@/constants/store';
// import { IUser, UserActions } from '@/types/store/userActions';
//
// const initialState: IUser = {
//   id: 0,
//   name: '',
//   login: '',
//   email: '',
//   isAuth: false,
//   isAuthSpin: false,
//   chats: [],
//   selectedChat: null,
//   errorMessage: '',
// };
//
// export function userReducer(state = initialState, action: UserActions): IUser {
//   const cloneState = _.cloneDeep(state);
//
//   switch (action.type) {
//   case Auth.SIGN_IN_REQUEST: // done signInRequest in User
//   case Auth.SIGN_UP_REQUEST: // done signUnRequest in User
//     return {
//       ...state,
//       isAuthSpin: true,
//     };
//   case Auth.SIGN_IN_SUCCEED: // done signInSucceed in User
//     return {
//       ...cloneState,
//       ...action.payload.userData,
//       isAuth: true,
//       isAuthSpin: false,
//     };
//   case Auth.REMOVE_AUTH_ERROR_MESSAGE: // done removeAuthErrorMessage in User
//     delete cloneState.errorMessage;
//
//     return cloneState;
//   case Auth.SIGN_IN_FAILED: // done signInRequest in User
//   case Auth.SIGN_UP_FAILED: // done signUpRequest in User
//     return {
//       ...state,
//       isAuth: false,
//       isAuthSpin: false,
//       errorMessage: action.payload.errorMessage,
//     };
//   case Chat.ADD_NEW_CHAT: // done createChatSucceed in User, done in chatSaga
//     const { chat } = action.payload;
//
//     return {
//       ...state,
//       chats: [...state.chats, chat],
//     };
//   case Chat.DELETE_OLD_CHAT: // done deleteChatSucceed in User
//     const { chatId } = action.payload;
//
//     return {
//       ...state,
//       chats: state.chats.filter(chat => chat.id !== chatId),
//     };
//   case Auth.LOGOUT: // done logout in User
//     return initialState;
//   case User.GET_SELECTED_CHAT: // done getSelectedChat in User
//     return {
//       ...state,
//       selectedChat: action.payload.selectedChat,
//     };
//   case Chat.EDIT_CHAT_NAME: // done editChatNameRequest in User
//     return {
//       ...state,
//       selectedChat: state.selectedChat ? {
//         ...state.selectedChat,
//         name: action.payload.name,
//       } : null,
//     };
//   case Chat.ADD_NEW_CHAT_NAME: { // done editChatNameSucceed in User
//     const newChats = state.chats
//       .map(chat => chat.id === action.payload.id
//         ? { ...chat, name: action.payload.name }
//         : chat);
//     return {
//       ...state,
//       chats: newChats,
//     };
//   }
//   case User.EDIT_CURRENT_USER_SUCCEED: // done editCurrentUserSucceed in User
//     return {
//       ...state,
//       ...action.payload.changedField,
//     };
//   case Auth.CHANGE_PASSWORD_REQUEST: // not now, code is not ready for that yet
//     return state;
//   case Auth.CHANGE_PASSWORD_SUCCEED: { // not now, code is not ready for that yet
//     return state;
//   }
//   default:
//     return state;
//   }
// }
export const f = 10;
