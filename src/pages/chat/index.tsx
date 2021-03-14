import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { LeftChat } from '@/pages/chat/leftChat';
import { MainChat } from '@/pages/chat/mainChat';
import styles from './styles.module.scss';

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
