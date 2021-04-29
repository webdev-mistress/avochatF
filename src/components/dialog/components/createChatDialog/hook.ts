import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsShowCreateChat } from '@/redux/store/ui/selectors';
// import { createChat } from '@/redux/store/oldChat/actions';
import { setShowCreateChat } from '@/redux/store/ui/actions';
import { createChatRequest } from '@/redux/store/chat/actions';

export const useCreateChatDialog = (): any => {
  const [chatName, setChatName] = useState('');
  const isShowDialog = useSelector(selectIsShowCreateChat);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isShowDialog) {
      setChatName('');
    }
  }, [isShowDialog]);

  const onChangeFieldValue = useCallback(() => (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setChatName(value);
  }, []);

  const onCloseDialog = useCallback(() => {
    dispatch(setShowCreateChat({ isActive: false }));
  }, [dispatch]);

  const onCreateChat = useCallback((chatName: string) => () => {
    dispatch(createChatRequest(chatName));
  }, [dispatch]);

  const onKeyUpEnter = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if(event.key === 'Enter') {
      onCreateChat(chatName)();
    }
  }, [chatName, onCreateChat]);

  return {
    chatName,
    onChangeFieldValue,
    onCloseDialog,
    onCreateChat,
    isShowDialog,
    onKeyUpEnter,
  };
};
