import { call, put, takeEvery, select } from 'redux-saga/effects';
import { Chat } from '@/constants/store';
import { getErrorMessage } from '@/helpers/sagas';
import {
  errorMessages, getMessages, sendMessageFailed,
  deleteMessageFailed, checkMembersLoaded, deleteUnwanterUser, addNewChatName,
} from '@/redux/store/chat/actions';
import { selectActiveChatId, selectMessages } from '@/redux/store/chat/selectors';
import { selectUserLogin } from '@/redux/store/user/selectors';
import {
  getMessages as getMessagesFromApi,
  sendMessage, deleteMessage,
  editMessage, createChat, deleteChat, deleteUserFromChat, editChatName, getParticipants,
} from '@/redux/api';
import { addNewChat, deleteOldChat } from '@/redux/store/user/actions';
import { setIsShowCreateChat } from '@/redux/store/ui/actions';
import {
  ICheckMembers,
  ICreateChat,
  IDeleteChat,
  IDeleteMessage, IDeleteUserFromChat, IEditChatName,
  IEditMessage,
  IMessage,
  IRequestMessages,
  ISendMessage,
} from '@/types/store/chatActions';
import {
  ICreateChatSaga,
  IDeleteChatSaga,
  IDeleteUserFromChatSaga,
  IGetMessagesSaga,
  ISendMessageSaga,
  ICkeckMembersSaga, IEditChatNameSaga,
} from '@/types/sagas';

function* requestMessages(chatId: number) {
  try {
    const response: IGetMessagesSaga = yield call(getMessagesFromApi, chatId);

    if (!response.data || !response.ok) {
      throw response.message;
    }

    yield put(getMessages(response.data));
  } catch (error) {
    yield put(errorMessages(getErrorMessage(error)));
  }
}

function* fetchRequestMessages(action: IRequestMessages) {
  yield call(requestMessages, action.payload.chatId);
}

function* fetchSendMessage(action: ISendMessage) {
  try {
    const login = yield select(selectUserLogin);
    const chatId = yield select(selectActiveChatId);

    const response: ISendMessageSaga = yield call(
      sendMessage, login, chatId, action.payload.messageText,
    );

    if (!response.data || !response.ok) {
      throw response.message;
    }
    yield call(requestMessages, chatId);
  } catch (error) {
    yield put(sendMessageFailed(getErrorMessage(error)));
  }
}

function* fetchDeleteMessage(action: IDeleteMessage) {
  const state = yield select(state => state);

  try {
    yield call(deleteMessage, action.payload.messageId);
    const chatId = selectActiveChatId(state);

    yield call(requestMessages, chatId);
  } catch (error) {
    yield put(deleteMessageFailed(getErrorMessage(error)));
  }
}

function* fetchEditMessage(action: IEditMessage) {
  try {
    const { editMessageId, messageEdit } = action.payload.messageData;

    const response: ISendMessageSaga = yield call(
      editMessage, editMessageId, messageEdit,
    );

    if (!response.data || !response.ok) {
      throw response.message;
    }

    const messages = yield select(selectMessages);
    const newMessages = messages.map((message: IMessage) =>
      message.messageId === editMessageId ? response.data : message);
    yield put(getMessages(newMessages));
  } catch (error) {
    console.error(error);
  }
}

function* fetchCreateChat(action: ICreateChat) {
  try {
    const login = yield select(selectUserLogin);
    const { chatName } = action.payload;
    const response: ICreateChatSaga = yield call(createChat, chatName, login);

    if (!response.data || !response.ok) {
      throw response.message;
    }

    yield put(addNewChat(response.data));
    yield put(setIsShowCreateChat(false));
  } catch (error) {
    console.error(error);
  }
}

function* fetchDeleteChat(action: IDeleteChat) {
  try {
    const { chatId } = action.payload;
    const response: IDeleteChatSaga = yield call(deleteChat, chatId);

    if (response.ok) {
      yield put(deleteOldChat(chatId));
    }
  } catch (error) {
    console.error(error);
  }
}

function* fetchDeleteUserFromChat(action: IDeleteUserFromChat) {
  try {
    const { login, chatId } = action.payload;
    const response: IDeleteUserFromChatSaga = yield call(
      deleteUserFromChat, login, chatId,
    );
    if (response.ok) {
      yield put(deleteUnwanterUser(login, chatId));
    }
  } catch (error) {
    console.error(error);
  }
}

function* fetchGetParticipants(action: ICheckMembers) {
  try {
    const { chatId } = action.payload;
    const response: ICkeckMembersSaga = yield call(getParticipants, chatId);
    if (response.ok) {
      yield put(checkMembersLoaded(response.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* fetchEditChatName(action: IEditChatName) {
  try {
    const { name, id } = action.payload;
    const response: IEditChatNameSaga = yield call(editChatName, name, id);
    if (response.ok) {
      yield put(addNewChatName(response.data.name, response.data.id));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* chatSaga(): any {
  yield takeEvery(Chat.MESSAGES_REQUESTED, fetchRequestMessages);
  yield takeEvery(Chat.SEND_MESSAGE, fetchSendMessage);
  yield takeEvery(Chat.DELETE_MESSAGE, fetchDeleteMessage);
  yield takeEvery(Chat.EDIT_MESSAGE, fetchEditMessage);
  yield takeEvery(Chat.CREATE_CHAT, fetchCreateChat);
  yield takeEvery(Chat.DELETE_CHAT, fetchDeleteChat);
  yield takeEvery(Chat.DELETE_USER_FROM_CHAT, fetchDeleteUserFromChat);
  yield takeEvery(Chat.GET_CHAT_PARTICIPANTS, fetchGetParticipants);
  yield takeEvery(Chat.EDIT_CHAT_NAME, fetchEditChatName);
}
