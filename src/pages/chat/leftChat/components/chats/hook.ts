import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { selectActiveChatId, selectUserChats } from '@/redux/store/chat/selectors';
// import { selectUserChats } from '@/redux/store/user/selectors';
import { setShowChatSettings, setShowCreateChat } from '@/redux/store/ui/actions';
import {
  getActiveChat,
  getMessagesRequest,
  getParticipantsRequest, getSelectedChat,
} from '@/redux/store/chat/actions';
// import { getSelectedChat } from '@/redux/store/user/actions';
import { IChat } from '@/redux/store/chat/types';

export const useChat = (): any => {
  const dispatch: Dispatch = useDispatch();
  const chats: IChat[] = useSelector(selectUserChats);

  const activeChatId: number = useSelector(selectActiveChatId);

  const onLoadChat = useCallback((chat) => () => {
    dispatch(getActiveChat(chat));
    dispatch(getMessagesRequest(chat.id));
  }, [dispatch]);

  const onOpenCreateChatDialog = useCallback(() => {
    dispatch(setShowCreateChat({ isActive: true }));
  }, [dispatch]);

  const onOpenChatSettings = useCallback((chat) => (
    event: React.MouseEvent<SVGSVGElement>,
  ) => {
    event.stopPropagation();
    dispatch(getSelectedChat(chat));
    dispatch(getParticipantsRequest(chat.id));
    dispatch(setShowChatSettings({ isActive: true, chatId: chat.id }));
  }, [dispatch]);

  return {
    chats,
    activeChatId,
    onLoadChat,
    onOpenChatSettings,
    onOpenCreateChatDialog,
  };
};
