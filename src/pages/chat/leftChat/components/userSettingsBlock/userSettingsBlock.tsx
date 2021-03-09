import React from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import { Chats } from '@/pages/chat/leftChat/components/chats/chats';
import {
  useUserSettingsBlock,
} from '@/pages/chat/leftChat/components/userSettingsBlock/hook';
import styles from '../../styles.module.scss';

export const UserSettingsBlock: React.FunctionComponent = () => {
  const {
    userName,
    onOpenUserSettings,
    onClearActiveChat,
    onOpenLogoutDialog,
  } = useUserSettingsBlock();

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBlockWrapper}>
        <div
          className={styles.logoutWrapper}
          onClick={onOpenLogoutDialog}
        >
          <ExitToAppIcon />
        </div>
        <div className={styles.topBlock} onClick={onClearActiveChat}>
          {userName}
        </div>
        <div
          className={styles.logoutWrapper}
          onClick={onOpenUserSettings}
        >
          <SettingsIcon />
        </div>
      </div>
      <div className={styles.mainBlock}>
        <Chats />
      </div>
    </div>
  );
};
