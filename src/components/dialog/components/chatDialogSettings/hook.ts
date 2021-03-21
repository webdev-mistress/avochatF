import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {
  selectSelectedChat,
  selectUserId,
  selectUserLogin,
} from '@/redux/store/user/selectors';
import { addUserToChat } from '@/redux/store/user/actions';
import {
  clearChat,
  deleteChat,
  deleteUserFromChat,
  editOldChatName,
} from '@/redux/store/chat/actions';
import { selectIsShowChatSettings } from '@/redux/store/ui/selectors';
import { setShowChatSettings } from '@/redux/store/ui/actions';
import { IChat } from '@/types/store/chatActions';

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
      dispatch(addUserToChat(
        { login: fieldValue, selectedChatId: selectedChat.id }),
      );
      setFieldValue('');
    }
  }, [dispatch, selectedChat]);

  const onDeleteChatDialog = useCallback(() => {
    dispatch(deleteChat(selectedChat.id));
    dispatch(clearChat());
    onCloseDialog();
  }, [dispatch, onCloseDialog, selectedChat]);

  const onLeaveChat = useCallback(() => {
    dispatch(deleteUserFromChat(selectedUserLogin, selectedChat.id));
    dispatch(deleteChat(selectedChat.id));
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
      dispatch(editOldChatName(newChatNameValue, selectedChat.id));
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
