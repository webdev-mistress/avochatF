import React, { useEffect } from 'react';

import { LeftChat } from './LeftChat';
import { MainChat } from './MainChat';
import styles from './styles.module.scss';
import { useDispatch } from 'react-redux';

export const ChatPage = () => {
    const dispatch = useDispatch();
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
