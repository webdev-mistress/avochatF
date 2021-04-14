import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {
  selectUserId,
  selectUserLogin,
} from '@/redux/store/user/selectors';
import { selectIsShowChatSettings } from '@/redux/store/ui/selectors';
import { setShowChatSettings } from '@/redux/store/ui/actions';
import {
  clearChat,
  deleteChatRequest,
  deleteUserFromChatRequest, editChatNameRequest, getSelectedChatId,
} from '@/redux/store/chat/actions';
import { addUserToChatRequest } from '@/redux/store/user/actions';
// import { IChat } from '@/redux/store/chat/types';
import {
  selectSelectedChatId,
  selectSelectedChatName, selectSelectedUserOwnerId,
} from '@/redux/store/chat/selectors';
// import { selectSelectedChat } from '@/redux/store/chat/selectors';

export const useChatDialogSettings = (): any => {
  const [isEditMode, setEditMode] = useState(false);
  const [fieldValue, setFieldValue] = useState('');
  const dispatch: Dispatch = useDispatch();
  const selectedUserId: number | null = useSelector(selectUserId);
  const selectedUserLogin: string | null = useSelector(selectUserLogin);
  // const selectedChat: IChat = useSelector(selectSelectedChat);
  const selectedChatId: number | null = useSelector(selectSelectedChatId);
  const selectedChatName: string | null = useSelector(selectSelectedChatName);
  const selectedUserOwnerId: number | null = useSelector(selectSelectedUserOwnerId);
  const isShowChatSettings = useSelector(selectIsShowChatSettings);
  const [newChatNameValue, setChatName] = useState('');

  const onCloseDialog = useCallback(() => {
    dispatch(setShowChatSettings({ isActive: false, chatId: null }));
    dispatch(getSelectedChatId(null));
  }, [dispatch]);

  const onCloseDialogClick = useCallback(() => {
    setEditMode(false);
    setFieldValue('');
    onCloseDialog();
  }, [onCloseDialog]);

  const onChangeFieldValue = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFieldValue(event.target.value);
  }, []);

  const onAddUserToChatDialog = useCallback((fieldValue: string) => () => {
    dispatch(addUserToChatRequest({ login: fieldValue, selectedChatId }));
    setFieldValue('');
  }, [dispatch, selectedChatId]);

  const onDeleteChatDialog = useCallback(() => {
    dispatch(deleteChatRequest(selectedChatId));
    dispatch(clearChat());
    onCloseDialog();
  }, [dispatch, onCloseDialog, selectedChatId]);

  const onLeaveChat = useCallback(() => {
    dispatch(deleteUserFromChatRequest(selectedUserLogin, selectedChatId));
    dispatch(deleteChatRequest(selectedChatId));
    onCloseDialog();
  }, [dispatch, onCloseDialog, selectedChatId, selectedUserLogin]);

  const onEditChatName = useCallback(() => {
    setEditMode(!isEditMode);
  }, [isEditMode]);

  const onChangeChatName = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setChatName(event.target.value);
  }, []);

  const onEditOldChatName = useCallback((newChatNameValue: string) => () => {
    if(selectedChatName) {
      setChatName(selectedChatName);
      dispatch(editChatNameRequest({ name: newChatNameValue, id: selectedChatId }));
      setEditMode(!isEditMode);
    }
  }, [dispatch, isEditMode, selectedChatId, selectedChatName]);

  const onKeyUpEditChatEnter = useCallback((event) => {
    if(event.key === 'Enter') {
      onEditOldChatName(newChatNameValue)();
    }
  }, [newChatNameValue, onEditOldChatName]);

  const onKeyUpAddUser = useCallback((event) => {
    if(event.key === 'Enter') {
      onAddUserToChatDialog(fieldValue)();
    }
  }, [fieldValue, onAddUserToChatDialog]);

  useEffect(() => {
    if(selectedChatName) {
      setChatName(selectedChatName);
    }
  }, [selectedChatName]);

  return {
    isEditMode,
    fieldValue,
    selectedUserId,
    selectedChatId,
    selectedChatName,
    selectedUserOwnerId,
    newChatNameValue,
    onCloseDialogClick,
    onChangeFieldValue,
    onAddUserToChatDialog,
    onDeleteChatDialog,
    onLeaveChat,
    onEditChatName,
    onChangeChatName,
    onEditOldChatName,
    isShowChatSettings,
    onKeyUpEditChatEnter,
    onKeyUpAddUser,
  };
};
