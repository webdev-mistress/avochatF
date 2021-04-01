export const b = 10;
// import { Chat, Message, Auth } from '@/constants/store';
// import { ChatActions, IActiveChat } from '@/types/store/chatActions';
//
// const initialState: IActiveChat = {
//   isCreateChatSpin: false,
//   isActiveChatSpin: false,
//   chatMembersList: [],
// };
//
// export function chatReducer(
//   state = initialState, action: ChatActions ,
// ): IActiveChat {
//   switch (action.type) {
//   case Chat.CREATE_CHAT: // done createChatRequest, done in chatSaga
//     return {
//       ...state,
//       isCreateChatSpin: true,
//     };
//   case Chat.ADD_NEW_CHAT: // done createChatSucceed, done in chatSaga
//     return {
//       ...state,
//       info: action.payload.chat,
//       isCreateChatSpin: false,
//     };
//   case Message.MESSAGES_SUCCEEDED: // done getMessagesSucceed, done in chatSaga
//     return {
//       ...state,
//       info: state.info ? {
//         ...state.info,
//         messages: action.payload,
//       } : undefined,
//     };
//   case Chat.GET_ACTIVE_CHAT: // done getActiveChat, done in chats => hook
//     return {
//       ...state,
//       info: action.payload,
//     };
//   case Chat.CLEAR_CHAT: // done clearChat, in chatDialogSet., alert, topSet.block
//     return initialState;
//   case Message.EDIT_MESSAGE: // done editMessageRequest/Succeed, add in messages hook and websocketSaga??
//     return {
//       ...state,
//       editMessageId: action.payload.messageData.editMessageId,
//       messageEdit: action.payload.messageData.messageEdit,
//     };
//   case Chat.GET_CHAT_PARTICIPANTS_LOADED: // done getParticipantsSucceed, done in chatSaga
//     return {
//       ...state,
//       chatMembersList: action.payload.data,
//     };
//   case Chat.DELETE_USER_FROM_CHAT: // done deleteUserFromChatRequest, done in chatSaga
//     return {
//       ...state,
//       chatMembersList: state.chatMembersList && state.chatMembersList
//         .filter(member => member.login !== action.payload.login),
//     };
//   case Auth.LOGOUT: // done logout in User, done in LogoutUser
//     return initialState;
//   default:
//     return state;
//   }
// }
