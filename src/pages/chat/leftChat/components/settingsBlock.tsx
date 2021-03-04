import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import { accessToken } from '@/helpers/localStorage';
import { selectUserChats, selectUserName } from '@/redux/store/user/selectors';
import { logoutUser } from '@/redux/store/user/actions';
import { clearChat } from '@/redux/store/chat/actions';
import { Chats } from '@/pages/chat/leftChat/components/chats/chats';
import { DIALOG_MODE } from '@/pages/chat/leftChat/constants';
import { IChat } from '@/types/store';
import { IDialogModeElement } from '@/types/components';
import styles from '../styles.module.scss';

interface IProps {
    setDialogMode: (dialog: IDialogModeElement) => void,
    onClearActiveChat: () => void,
}

export const SettingsBlock = (props: IProps) => {
    const { setDialogMode, onClearActiveChat } = props ;

    const userName = useSelector(selectUserName);
    const dispatch: Dispatch = useDispatch();

    const chats: IChat[] = useSelector(selectUserChats);

    const onAuthLogout = useCallback(() => {
        dispatch(logoutUser());
        dispatch(clearChat());
        accessToken.remove();
    }, [dispatch]);

    const onCheckUserSettings = useCallback(() => {
        props.setDialogMode(DIALOG_MODE.USER_SETTINGS);
    }, [props]);

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
