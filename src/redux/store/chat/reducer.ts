import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { IActiveChat } from '@/redux/store/chat/types';
import {
  clearChat,
  createChatRequest,
  createChatSucceed,
  deleteChatRequest,
  deleteUserFromChatRequest,
  deleteUserFromChatSucceed,
  editMessageRequest,
  editMessageSucceed,
  getActiveChat,
  getMessagesRequest,
  getMessagesSucceed,
  getParticipantsRequest,
  getParticipantsSucceed,
} from '@/redux/store/chat/actions';
import {
  clearChatHandler,
  createChatRequestHandler,
  createChatSucceedHandler,
  deleteChatRequestHandler,
  deleteUserFromChatRequestHandler,
  deleteUserFromChatSucceedHandler, editMessageRequestHandler, editMessageSucceedHandler,
  getActiveChatHandler, getMessagesRequestHandler, getMessagesSucceedHandler,
  getParticipantsRequestHandler,
  getParticipantsSucceedHandler, logoutHandler,
} from '@/redux/store/chat/handlers';
import { logout } from '@/redux/store/user/actions';

export const INITIAL_STATE: IActiveChat = {
  isCreateChatSpin: false,
  isActiveChatSpin: false,
  isDeleteChatSpin: false,
  isGetMessagesSpin: false,
  isSendMessageSpin: false,
  isDeleteMessageSpin: false,
  isEditMessageSpin: false,
  isGetParticipantsSpin: false,
  isDeleteUserFromChatSpin: false,
  chatMembersList: [],
};

export const chatReducer = reducerWithInitialState(INITIAL_STATE)
  .case(createChatRequest, createChatRequestHandler)
  .case(createChatSucceed, createChatSucceedHandler)
  .case(deleteChatRequest, deleteChatRequestHandler)
  .case(clearChat, clearChatHandler)
  .case(getActiveChat, getActiveChatHandler)
  .case(getParticipantsRequest, getParticipantsRequestHandler)
  .case(getParticipantsSucceed, getParticipantsSucceedHandler)
  .case(deleteUserFromChatRequest, deleteUserFromChatRequestHandler)
  .case(deleteUserFromChatSucceed, deleteUserFromChatSucceedHandler)
  .case(getMessagesRequest, getMessagesRequestHandler)
  .case(getMessagesSucceed, getMessagesSucceedHandler)
  .case(editMessageRequest, editMessageRequestHandler)
  .case(editMessageSucceed, editMessageSucceedHandler)
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
