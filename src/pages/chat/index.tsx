import React, { useEffect } from 'react';

import { LeftChat } from '@/pages/chat/LeftChat';
import { MainChat } from '@/pages/chat/MainChat';
import styles from './styles.module.scss';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

export const ChatPage = () => {
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
