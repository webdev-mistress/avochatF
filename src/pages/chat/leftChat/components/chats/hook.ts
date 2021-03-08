import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { selectActiveChatId } from '@/redux/store/chat/selectors';
import {
  createChat,
  getActiveChat,
  getChatParticipants,
  requestMessages,
} from '@/redux/store/chat/actions';
import { getSelectedChat } from '@/redux/store/user/actions';
import { selectUserChats } from '@/redux/store/user/selectors';
import { IChat } from '@/types/store/chatActions';

export const useChat = (): any => {
  const dispatch: Dispatch = useDispatch();
  const chats: IChat[] = useSelector(selectUserChats);

  const activeChatId: number = useSelector(selectActiveChatId);

  const onLoadChat = useCallback((chat) => () => {
    dispatch(getActiveChat(chat));
    dispatch(requestMessages(chat.id));
  }, [dispatch]);

  const onCreateChatDialog = useCallback(() => {
    const onCreateChat = ((chatName: string) => {
      dispatch(createChat(chatName));
    });
  }, [dispatch]);

  const onOpenChatSettings = useCallback((chat) => (
    event: React.MouseEvent<SVGSVGElement>,
  ) => {
    event.stopPropagation();
    dispatch(getSelectedChat(chat));
    dispatch(getChatParticipants(chat.id));
  }, [dispatch]);

  return {
    chats,
    activeChatId,
    onLoadChat,
    onCreateChatDialog,
    onOpenChatSettings,
  };
};
