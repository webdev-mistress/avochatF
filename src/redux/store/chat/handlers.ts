import {
  DeleteUserData, EditMessageData,
  IActiveChat,
  IChat,
  IMembersData, IMessage,
} from '@/redux/store/chat/types';
import { INITIAL_STATE } from '@/redux/store/chat/reducer';

export const createChatRequestHandler = (
  state: IActiveChat,
): IActiveChat => ({
  ...state,
  isCreateChatSpin: true,
});

export const createChatSucceedHandler = (
  state: IActiveChat,
  chat: IChat,
): IActiveChat => ({
  ...state,
  info: chat,
  isCreateChatSpin: false,
});

export const deleteChatRequestHandler = (
  state: IActiveChat,
): IActiveChat => ({
  ...state,
  isDeleteChatSpin: true,
});

export const getActiveChatHandler = (
  state: IActiveChat,
  activeChat: IChat,
): IActiveChat => ({
  ...state,
  info: activeChat,
});

export const getParticipantsRequestHandler = (
  state: IActiveChat,
): IActiveChat => ({
  ...state,
  isGetParticipantsSpin: true,
});

export const getParticipantsSucceedHandler = (
  state: IActiveChat,
  chatMembersData: IMembersData[],
): IActiveChat => ({
  ...state,
  chatMembersList: chatMembersData,
});

export const deleteUserFromChatRequestHandler = (
  state: IActiveChat,
): IActiveChat => ({
  ...state,
  isDeleteUserFromChatSpin: true,
});

export const deleteUserFromChatSucceedHandler = (
  state: IActiveChat,
  deleteUserData: DeleteUserData,
): IActiveChat => ({
  ...state,
  chatMembersList: state.chatMembersList && state.chatMembersList
    .filter(member => member.login !== deleteUserData.login),
});

export const getMessagesRequestHandler = (
  state: IActiveChat,
): IActiveChat => ({
  ...state,
  isGetMessagesSpin: true,
});

export const getMessagesSucceedHandler = (
  state: IActiveChat,
  messages: IMessage[],
): IActiveChat => ({
  ...state,
  info: state.info ? {
    ...state.info,
    messages: messages,
  } : null,
});

export const editMessageRequestHandler = (
  state: IActiveChat,
): IActiveChat => ({
  ...state,
  isEditMessageSpin: true,
});

export const editMessageSucceedHandler = (
  state: IActiveChat,
  editMessageData: EditMessageData,
): IActiveChat => ({
  ...state,
  editedMessageId: editMessageData.messageId,
  editedMessage: editMessageData.message,
});

export const clearChatHandler = (): IActiveChat => INITIAL_STATE;
export const logoutHandler = (): IActiveChat => INITIAL_STATE;
