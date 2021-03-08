import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { selectSelectedChat, selectUserId } from '@/redux/store/user/selectors';
import { addUserToChat } from '@/redux/store/user/actions';
import {
  clearChat,
  deleteChat,
  deleteUserFromChat,
  editOldChatName,
} from '@/redux/store/chat/actions';
import { IChat } from '@/types/store';

interface IArgs {
    closeDialog: () => void,
}

export const useChatDialogSettings = (props: IArgs) => {
  const [isEditMode, setEditMode] = useState(false);
  const [fieldValue, setFieldValue] = useState('');
  const dispatch: Dispatch = useDispatch();
  const selectedUserId: number = useSelector(selectUserId);
  const selectedChat: IChat = useSelector(selectSelectedChat);
  const [newChatNameValue, setChatName] = useState('');

  const onCloseDialogClick = useCallback(() => {
    setEditMode(false);
    setFieldValue('');
    props.closeDialog();
  }, [props]);

  const onChangeFieldValue = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(event.target.value);
  }, []);

  const onAddUserToChatDialog = useCallback((fieldValue: string) => () =>{
    if(selectedChat) {
      dispatch(addUserToChat({ login: fieldValue, selectedChatId: selectedChat.id }));
      setFieldValue('');
    }
  }, [dispatch, selectedChat]);

  const onDeleteChatDialog = useCallback(() => {
    dispatch(deleteChat(selectedChat.id));
    dispatch(clearChat());
    props.closeDialog();
  }, [dispatch, props, selectedChat]);

  const onLeaveChat = useCallback((selectedUserId: number, selectedChat: IChat) => () => {
    dispatch(deleteUserFromChat(selectedUserId, selectedChat.id));
    dispatch(deleteChat(selectedChat.id));
    props.closeDialog();
  }, [dispatch, props]);

  const onEditChatName = useCallback(() => {
    setEditMode(!isEditMode);
  }, [isEditMode]);

  const onChangeChatName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setChatName(event.target.value);
  }, []);

  const onEditOldChatName = useCallback((newChatNameValue: string) => () => {
    if(selectedChat) {
      setChatName(selectedChat.name);
      dispatch(editOldChatName(newChatNameValue, selectedChat.id));
      setEditMode(!isEditMode);
    }
  }, [dispatch, isEditMode, selectedChat]);

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
  };
};
