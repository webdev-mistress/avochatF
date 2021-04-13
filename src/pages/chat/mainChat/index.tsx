import React, { useState, useRef, useCallback, useEffect } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import { selectUserId } from '@/redux/store/user/selectors';
import {
  selectActiveChatId,
  selectActiveChatName,
  selectMessages,
} from '@/redux/store/chat/selectors';
import { sendMessageRequest } from '@/redux/store/chat/actions';
import { IMessage } from '@/redux/store/chat/types';
import { EmptyChat } from '@/pages/chat/mainChat/components/emptyChat';
import { ChatMessages } from '@/pages/chat/mainChat/components/chatMessages/chatMessages';
import styles from './styles.module.scss';

export interface IState {
  messageText: string,
  isEditMode: boolean,
  selectedMessage: IMessage | null,
  message: IMessage | null,
  messageEdit: string,
  isRefreshing: boolean,
}

export const MainChat: React.FunctionComponent = () => {
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
  const userId = useSelector(selectUserId);
  const activeChatId = useSelector(selectActiveChatId);
  console.log(activeChatId, 'myLog activeChatId');
  const activeChatName = useSelector(selectActiveChatName);
  const messages = useSelector(selectMessages);
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

  // const hasActiveChat = !_.isEmpty(activeChat);
  const hasMessages = !_.isEmpty(messages);

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBlock}>
        <div className={styles.title}>
          {activeChatId ? `Active chat: ${activeChatName}` : 'Choose an oldChat'}
        </div>
      </div>
      {activeChatId && (
        <>
          <div ref={messageScroll} className={styles.messageWrapper}>
            {hasMessages
              ? (
                <ChatMessages
                  state={state}
                  setState={setState}
                  messages={messages}
                  userId={userId}
                  anchorEl={anchorEl}
                  setAnchorEl={setAnchorEl}
                />)
              : <EmptyChat />}
          </div>
          <div className={styles.form}>
            <TextField
              autoFocus
              id="standard-basic"
              color="primary"
              label="Enter Your Message"
              onChange={onChangeMessage}
              onKeyUp={onPressEvent}
              value={state.messageText}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={onSendMessage}
              disabled={!state.messageText}
            >
              <SendIcon />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
