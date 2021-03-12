import React from 'react';
import styles from '../styles.module.scss';

export const EmptyChat: React.FunctionComponent = () => (
  <div className={styles.noMessage}>
    You have no messages
  </div>
);
