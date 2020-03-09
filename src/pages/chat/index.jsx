import React from 'react';

import { LeftChat } from './LeftChat';
import { MainChat } from './MainChat';
import styles from './styles.module.scss';

export const ChatPage = () => (
    <div className={styles.wrapper}>
        <LeftChat />
        <MainChat />
    </div>
);
