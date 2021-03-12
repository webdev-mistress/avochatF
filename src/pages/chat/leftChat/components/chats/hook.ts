import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { selectActiveChatId } from '@/redux/store/chat/selectors';
import {
  getActiveChat,
  getChatParticipants,
  requestMessages,
} from '@/redux/store/chat/actions';
import { getSelectedChat } from '@/redux/store/user/actions';
import { selectUserChats } from '@/redux/store/user/selectors';
import { setIsShowChatSettings, setIsShowCreateChat } from '@/redux/store/ui/actions';
import { IChat } from '@/types/store/chatActions';

export const useChat = (): any => {
  const dispatch: Dispatch = useDispatch();
  const chats: IChat[] = useSelector(selectUserChats);

  const activeChatId: number = useSelector(selectActiveChatId);

  const onLoadChat = useCallback((chat) => () => {
    dispatch(getActiveChat(chat));
    dispatch(requestMessages(chat.id));
  }, [dispatch]);

  const onOpenCreateChatDialog = useCallback(() => {
    dispatch(setIsShowCreateChat(true));
  }, [dispatch]);

  const onOpenChatSettings = useCallback((chat) => (
    event: React.MouseEvent<SVGSVGElement>,
  ) => {
    event.stopPropagation();
    dispatch(getSelectedChat(chat));
    dispatch(getChatParticipants(chat.id));
    dispatch(setIsShowChatSettings(true, chat.id));
  }, [dispatch]);

  return {
    chats,
    activeChatId,
    onLoadChat,
    onOpenChatSettings,
    onOpenCreateChatDialog,
  };
};
