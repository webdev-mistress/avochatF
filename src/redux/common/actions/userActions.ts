import { getApiActions } from '@/utils/redux';

enum User {
    ADD_USER_TO_CHAT = 'ADD_USER_TO_CHAT',
    GET_SELECTED_CHAT = 'GET_SELECTED_CHAT',
    EDIT_CURRENT_USER = 'EDIT_CURRENT_USER',
}

const [
  addUserToChatRequest,
  addUserToChatSucceed,
  addUserToChatFailed,
] = getApiActions(User.ADD_USER_TO_CHAT);

const [
  getSelectedChatRequest,
  getSelectedChatSucceed,
  getSelectedChatFailed,
] = getApiActions(User.GET_SELECTED_CHAT);

const [
  editCurrentUserRequest,
  editCurrentUserSucceed,
  editCurrentUserFailed,
] = getApiActions(User.EDIT_CURRENT_USER);

export {
  addUserToChatRequest,
  addUserToChatSucceed,
  addUserToChatFailed,
  getSelectedChatRequest,
  getSelectedChatSucceed,
  getSelectedChatFailed,
  editCurrentUserRequest,
  editCurrentUserSucceed,
  editCurrentUserFailed,
};
