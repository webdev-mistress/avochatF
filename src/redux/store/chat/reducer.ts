import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
  clearChat,
  createChatSucceed,
  deleteChatSucceed,
  deleteUserFromChatSucceed, editChatNameSucceed,
  editMessageSucceed,
  getActiveChatId,
  getMessagesSucceed,
  getParticipantsSucceed, getSelectedChatId,
} from '@/redux/store/chat/actions';
import {
  clearChatHandler,
  createChatSucceedHandler,
  deleteChatSucceedHandler,
  deleteUserFromChatSucceedHandler,
  editChatNameSucceedHandler,
  editMessageSucceedHandler,
  getActiveChatHandler,
  getMessagesSucceedHandler,
  getParticipantsSucceedHandler,
  getSelectedChatHandler,
  logoutHandler,
  signInSucceedHandler,
} from '@/redux/store/chat/handlers';
import { logout, signInSucceed } from '@/redux/store/user/actions';
import { IChatStore } from '@/redux/store/chat/types';

export const INITIAL_STATE: IChatStore = {
  activeChatId: null,
  selectedChatId: null,
  editedMessageInfo: null,
  chats: [],
};

export const chatReducer = reducerWithInitialState(INITIAL_STATE)
  .case(createChatSucceed, createChatSucceedHandler)
  .case(deleteChatSucceed, deleteChatSucceedHandler)
  .case(editChatNameSucceed, editChatNameSucceedHandler)
  .case(getSelectedChatId, getSelectedChatHandler)
  .case(clearChat, clearChatHandler)
  .case(getActiveChatId, getActiveChatHandler)
  .case(getParticipantsSucceed, getParticipantsSucceedHandler)
  .case(deleteUserFromChatSucceed, deleteUserFromChatSucceedHandler)
  .case(getMessagesSucceed, getMessagesSucceedHandler)
  .case(editMessageSucceed, editMessageSucceedHandler)
  .case(signInSucceed, signInSucceedHandler)
  .case(logout, logoutHandler)
  .build();
