import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
  clearChat,
  createChatSucceed,
  deleteChatSucceed,
  deleteUserFromChatSucceed, editChatNameSucceed,
  editMessageSucceed,
  getActiveChat,
  getMessagesSucceed,
  getParticipantsSucceed, getSelectedChat,
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
  activeChatInfo: null,
  editedMessageInfo: null,
  chatMembersList: [],
  chats: [],
  selectedChat: null,
};

export const chatReducer = reducerWithInitialState(INITIAL_STATE)
  .case(createChatSucceed, createChatSucceedHandler)
  .case(deleteChatSucceed, deleteChatSucceedHandler)
  .case(editChatNameSucceed, editChatNameSucceedHandler)
  .case(getSelectedChat, getSelectedChatHandler)
  .case(clearChat, clearChatHandler)
  .case(getActiveChat, getActiveChatHandler)
  .case(getParticipantsSucceed, getParticipantsSucceedHandler)
  .case(deleteUserFromChatSucceed, deleteUserFromChatSucceedHandler)
  .case(getMessagesSucceed, getMessagesSucceedHandler)
  .case(editMessageSucceed, editMessageSucceedHandler)
  .case(signInSucceed, signInSucceedHandler)
  .case(logout, logoutHandler)
  .build();
