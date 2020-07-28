import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { selectUserChats, selectUserName } from '@/redux/store/user/selectors';
import { logoutUser } from '@/redux/store/user/actions';
import { clearChat } from '@/redux/store/chat/actions';
import { Chats } from '@/pages/chat/leftChat/components/chats';
import { DIALOG_MODE } from '@/pages/chat/leftChat/constants';
import { IChat } from '@/types/store';
import { IDialogModeElement } from '@/types/components';
import styles from '../styles.module.scss';

interface IProps {
    setDialogMode: (dialog: IDialogModeElement) => void,
    setAnchorMenu: (target: Element | null) => void,
    onClearActiveChat: () => void,
    setSelectedChatId: (chatId: number) => void,
}

export const SettingsBlock = (props: IProps) => {
    const { setDialogMode, onClearActiveChat, setAnchorMenu, setSelectedChatId } = props ;

    const userName = useSelector(selectUserName);
    const dispatch: Dispatch = useDispatch();

    const chats: IChat[] = useSelector(selectUserChats);

    const onAuthLogout = useCallback(() => {
        dispatch(logoutUser());
        dispatch(clearChat());
    }, [dispatch]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.topBlockWrapper}>
                <div
                    className={styles.logoutWrapper} onClick={() =>
                    setDialogMode({ ...DIALOG_MODE.LOGOUT, positiveBtnFunc: onAuthLogout })}>
                    <ExitToAppIcon />
                </div>
                <div className={styles.topBlock} onClick={onClearActiveChat}>
                    {userName}
                </div>
            </div>
            <div className={styles.mainBlock}>
                <Chats
                    chats={chats}
                    setAnchorMenu={setAnchorMenu}
                    setSelectedChatId={setSelectedChatId}
                    setDialogMode={setDialogMode}
                />
            </div>
        </div>
    );
};