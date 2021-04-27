import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { LeftChat } from '@/pages/chat/leftChat';
import styles from './styles.module.scss';
import { MainChat } from '@/pages/chat/mainChat/components/mainChatBlock/mainChatBlock';

export const ChatPage: React.FunctionComponent = () => {
  const dispatch: Dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'WEBSOCKET_CONNECT' });
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <LeftChat />
      <MainChat />
    </div>
  );
};
