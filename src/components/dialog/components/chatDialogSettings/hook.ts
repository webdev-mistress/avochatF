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
  deleteUserFromChatRequest, editChatNameRequest,
} from '@/redux/store/chat/actions';
import { addUserToChatRequest } from '@/redux/store/user/actions';
import { IChat } from '@/redux/store/chat/types';
import { selectSelectedChat } from '@/redux/store/chat/selectors';

export const useChatDialogSettings = (): any => {
  const [isEditMode, setEditMode] = useState(false);
  const [fieldValue, setFieldValue] = useState('');
  const dispatch: Dispatch = useDispatch();
  const selectedUserId: number = useSelector(selectUserId);
  const selectedUserLogin: string = useSelector(selectUserLogin);
  const selectedChat: IChat = useSelector(selectSelectedChat);
  const isShowChatSettings = useSelector(selectIsShowChatSettings);
  const [newChatNameValue, setChatName] = useState('');
  const onCloseDialog = useCallback(() => {
    dispatch(setShowChatSettings({ isActive: false, chatId: null }));
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
    if(selectedChat) {
      dispatch(addUserToChatRequest(
        { login: fieldValue, selectedChatId: selectedChat.id },
      ),
      );
      setFieldValue('');
    }
  }, [dispatch, selectedChat]);

  const onDeleteChatDialog = useCallback(() => {
    dispatch(deleteChatRequest(selectedChat.id));
    dispatch(clearChat());
    onCloseDialog();
  }, [dispatch, onCloseDialog, selectedChat]);

  const onLeaveChat = useCallback(() => {
    dispatch(deleteUserFromChatRequest(selectedUserLogin, selectedChat.id));
    dispatch(deleteChatRequest(selectedChat.id));
    onCloseDialog();
  }, [dispatch, onCloseDialog, selectedChat, selectedUserLogin]);

  const onEditChatName = useCallback(() => {
    setEditMode(!isEditMode);
  }, [isEditMode]);

  const onChangeChatName = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setChatName(event.target.value);
  }, []);

  const onEditOldChatName = useCallback((newChatNameValue: string) => () => {
    if(selectedChat) {
      setChatName(selectedChat.name);
      dispatch(editChatNameRequest({ name: newChatNameValue, id: selectedChat.id }));
      setEditMode(!isEditMode);
    }
  }, [dispatch, isEditMode, selectedChat]);

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
    if(selectedChat) {
      setChatName(selectedChat.name);
    }
  }, [selectedChat]);

  return {
    isEditMode,
    fieldValue,
    selectedUserId,
    selectedChat,
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
