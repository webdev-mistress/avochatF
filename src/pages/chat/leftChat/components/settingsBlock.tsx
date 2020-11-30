import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
// eslint-disable-next-line no-unused-vars
import { selectUser, selectUserChats, selectUserName } from '@/redux/store/user/selectors';
// eslint-disable-next-line no-unused-vars
import { getSelectedChat, logoutUser } from '@/redux/store/user/actions';
// eslint-disable-next-line no-unused-vars
import { checkChatMembers, clearChat } from '@/redux/store/chat/actions';
import { Chats } from '@/pages/chat/leftChat/components/chats';
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
    // const selectedUser = useSelector(selectUser);
    const dispatch: Dispatch = useDispatch();

    const chats: IChat[] = useSelector(selectUserChats);

    const onAuthLogout = useCallback(() => {
        dispatch(logoutUser());
        dispatch(clearChat());
    }, [dispatch]);

    const onCheckUserSettings = useCallback(() => {
        // dispatch(getSelectedChat(chat));
        // dispatch(checkChatMembers(chat.chatId));
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
