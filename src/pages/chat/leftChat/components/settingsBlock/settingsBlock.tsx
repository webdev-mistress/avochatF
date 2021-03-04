import React from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import { Chats } from '@/pages/chat/leftChat/components/chats/chats';
import { DIALOG_MODE } from '@/pages/chat/leftChat/constants';
import { useSettingsBlock } from '@/pages/chat/leftChat/components/settingsBlock/hook';
import { IDialogModeElement } from '@/types/components';
import styles from '../../styles.module.scss';

interface IProps {
    setDialogMode: (dialog: IDialogModeElement) => void,
    onClearActiveChat: () => void,
}

export const SettingsBlock = (props: IProps) => {
    const { setDialogMode, onClearActiveChat } = props ;

    const {
        userName,
        chats,
        onAuthLogout,
        onCheckUserSettings,
    } = useSettingsBlock({ setDialogMode });

    return (
        <div className={styles.wrapper}>
            <div className={styles.topBlockWrapper}>
                <div
                    className={styles.logoutWrapper}
                    onClick={() =>
                    setDialogMode({ ...DIALOG_MODE.LOGOUT, positiveBtnFunc: onAuthLogout })}>
                    <ExitToAppIcon />
                </div>
                <div className={styles.topBlock} onClick={onClearActiveChat}>
                    {userName}
                </div>
                <div
                    className={styles.logoutWrapper}
                    onClick={onCheckUserSettings}
                >
                    <SettingsIcon />
                </div>
            </div>
            <div className={styles.mainBlock}>
                <Chats
                    chats={chats}
                    setDialogMode={setDialogMode}
                />
            </div>
        </div>
    );
};
