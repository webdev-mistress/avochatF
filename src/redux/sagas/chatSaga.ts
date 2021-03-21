import { call, put, takeEvery, select } from 'redux-saga/effects';
import { Chat } from '@/constants/store';
import {
  checkMembersLoaded, deleteUnwanterUser, addNewChatName,
} from '@/redux/store/chat/actions';
import { selectUserLogin } from '@/redux/store/user/selectors';
import { addNewChat, deleteOldChat } from '@/redux/store/user/actions';
import {
  createChat,
  deleteChat,
  deleteUserFromChat, editChatName,
  getParticipants,
} from '@/redux/api/chatApi';
import { setShowCreateChat } from '@/redux/store/ui/actions';
import {
  ICheckMembers,
  ICreateChat,
  IDeleteChat,
  IDeleteUserFromChat, IEditChatName,
} from '@/types/store/chatActions';
import {
  ICreateChatSaga,
  IDeleteChatSaga,
  IDeleteUserFromChatSaga,
  ICkeckMembersSaga, IEditChatNameSaga,
} from '@/types/sagas';

function* fetchCreateChat(action: ICreateChat) {
  try {
    const login = yield select(selectUserLogin);
    const { chatName } = action.payload;
    const response: ICreateChatSaga = yield call(createChat, chatName, login);

    if (!response.data || !response.ok) {
      throw response.message;
    }

    yield put(addNewChat(response.data));
    yield put(setShowCreateChat({ isActive: false }));
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
  yield takeEvery(Chat.CREATE_CHAT, fetchCreateChat);
  yield takeEvery(Chat.DELETE_CHAT, fetchDeleteChat);
  yield takeEvery(Chat.DELETE_USER_FROM_CHAT, fetchDeleteUserFromChat);
  yield takeEvery(Chat.GET_CHAT_PARTICIPANTS, fetchGetParticipants);
  yield takeEvery(Chat.EDIT_CHAT_NAME, fetchEditChatName);
}
