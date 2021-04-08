import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
  clearChat,
  // createChatRequest,
  createChatSucceed,
  // deleteChatRequest,
  deleteChatSucceed,
  // deleteUserFromChatRequest,
  deleteUserFromChatSucceed, editChatNameSucceed,
  // editMessageRequest,
  editMessageSucceed,
  getActiveChat,
  // getMessagesRequest,
  getMessagesSucceed,
  // getParticipantsRequest,
  getParticipantsSucceed, getSelectedChat,
} from '@/redux/store/chat/actions';
import {
  clearChatHandler,
  // createChatRequestHandler,
  createChatSucceedHandler,
  deleteChatSucceedHandler,
  // deleteChatRequestHandler,
  // deleteUserFromChatRequestHandler,
  deleteUserFromChatSucceedHandler,
  editChatNameSucceedHandler,
  // editMessageRequestHandler,
  editMessageSucceedHandler,
  getActiveChatHandler,
  // getMessagesRequestHandler,
  getMessagesSucceedHandler,
  // getParticipantsRequestHandler,
  getParticipantsSucceedHandler,
  getSelectedChatHandler,
  logoutHandler,
  signInSucceedHandler,
} from '@/redux/store/chat/handlers';
import { logout, signInSucceed } from '@/redux/store/user/actions';
import { IChatStore } from '@/redux/store/chat/types';

// export const INITIAL_STATE: IActiveChat = {
//   isCreateChatSpin: false,
//   isActiveChatSpin: false,
//   isDeleteChatSpin: false,
//   isGetMessagesSpin: false,
//   isSendMessageSpin: false,
//   isDeleteMessageSpin: false,
//   isEditMessageSpin: false,
//   isGetParticipantsSpin: false,
//   isDeleteUserFromChatSpin: false,
//   chatMembersList: [],
// };

export const INITIAL_STATE: IChatStore = {
  activeChatInfo: null,
  editedMessageInfo: null,
  chatMembersList: [],
  chats: [],
  selectedChat: null,
};

export const chatReducer = reducerWithInitialState(INITIAL_STATE)
  // .case(createChatRequest, createChatRequestHandler)
  .case(createChatSucceed, createChatSucceedHandler)
  .case(deleteChatSucceed, deleteChatSucceedHandler)
  .case(editChatNameSucceed, editChatNameSucceedHandler)
  .case(getSelectedChat, getSelectedChatHandler)
  // .case(deleteChatRequest, deleteChatRequestHandler)
  .case(clearChat, clearChatHandler)
  .case(getActiveChat, getActiveChatHandler)
  // .case(getParticipantsRequest, getParticipantsRequestHandler)
  .case(getParticipantsSucceed, getParticipantsSucceedHandler)
  // .case(deleteUserFromChatRequest, deleteUserFromChatRequestHandler)
  .case(deleteUserFromChatSucceed, deleteUserFromChatSucceedHandler)
  // .case(getMessagesRequest, getMessagesRequestHandler)
  .case(getMessagesSucceed, getMessagesSucceedHandler)
  // .case(editMessageRequest, editMessageRequestHandler)
  .case(editMessageSucceed, editMessageSucceedHandler)
  .case(signInSucceed, signInSucceedHandler)
  .case(logout, logoutHandler)
  .build();

// editMessageSucceed is not used yet

// sendMessageRequest,
// sendMessageSucceed,
// sendMessageFailed,

// deleteMessageRequest,
// deleteMessageSucceed,
// deleteMessageFailed,

// getParticipantsFailed,
// createChatFailed,
// deleteChatFailed,
// deleteUserFromChatFailed,
// getMessagesFailed,
// editMessageFailed,
// editChatNameFailed,

