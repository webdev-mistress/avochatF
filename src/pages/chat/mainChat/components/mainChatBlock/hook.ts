import { useCallback, useEffect, useRef, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '@/redux/store/user/selectors';
import {
  selectActiveChatId,
  selectActiveChatName,
  selectMessages,
} from '@/redux/store/chat/selectors';
import { Message, sendMessageRequest } from '@/redux/store/chat/actions';
import _ from 'lodash';
import { IMessage } from '@/redux/store/chat/types';
import { selectLoaderStatus } from '@/redux/store/ui/selectors';

export interface IState {
  messageText: string,
  isEditMode: boolean,
  selectedMessage: IMessage | null,
  message: IMessage | null,
  messageEdit: string,
  isRefreshing: boolean,
}

export const useMainChatBlock = (): any => {
  const initialState: IState = {
    messageText: '',
    isEditMode: false,
    selectedMessage: null,
    messageEdit: '',
    message: null,
    isRefreshing: false,
  };
  const [state, setState] = useState(initialState);
  const dispatch: Dispatch = useDispatch();
  const userId: number | null = useSelector(selectUserId);
  const activeChatId = useSelector(selectActiveChatId);
  const activeChatName = useSelector(selectActiveChatName);
  const messages = useSelector(selectMessages);
  const isSendMessageLoading = useSelector(selectLoaderStatus(Message.SEND_MESSAGE));
  const messageScroll = useRef<HTMLInputElement>(null);

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  useEffect(() => {
    if (messageScroll.current) {
      messageScroll.current.scrollTop = 999999;
    }
  }, [messages, messageScroll]);

  const onSendMessage = useCallback(() => {
    if (!state.messageText) {
      return;
    }
    dispatch(sendMessageRequest(state.messageText));
    setState({ ...state, messageText: '' });
  }, [dispatch, state]);

  const onPressEvent = useCallback((event) => {
    event.key === 'ArrowUp' && setTimeout(() => {
      const editedLastInfo = _.findLast(
        messages, (message) => message.author.userId === userId,
      );

      setState({
        ...state,
        isEditMode: true,
        selectedMessage: editedLastInfo || null,
        messageEdit: editedLastInfo ? editedLastInfo.message : '',
      });
    }, 0);
    event.key === 'Enter' && onSendMessage();
    event.key === 'Escape' && event.target.blur();
  }, [messages, onSendMessage, state, userId]);

  const onChangeMessage = useCallback((event) => {
    setState({ ...state, messageText: event.target.value });
  }, [state]);

  const hasMessages = !_.isEmpty(messages);

  return {
    activeChatId,
    activeChatName,
    messageScroll,
    hasMessages,
    state,
    setState,
    messages,
    userId,
    anchorEl,
    setAnchorEl,
    onChangeMessage,
    onPressEvent,
    onSendMessage,
    isSendMessageLoading,
  };
};
