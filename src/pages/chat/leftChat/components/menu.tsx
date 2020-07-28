import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { addUserToChat } from '@/redux/store/user/actions';
import { checkChatMembers, deleteChat, deleteUserFromChat } from '@/redux/store/chat/actions';
import { DIALOG_MODE } from '@/pages/chat/leftChat/constants';
import { IDialogModeElement } from '@/types/components';
import styles from '../styles.module.scss';

interface IProps {
    setDialogMode: (dialog: IDialogModeElement) => void,
    setAnchorMenu: (anchorMenu: null) => void,
    onClearActiveChat: () => void,
    selectedChatId: number,
    anchorMenu: Element | null,
}

export const ChatMenu = (props: IProps) => {
    const dispatch: Dispatch = useDispatch();

    const onCloseMenu = useCallback(() => {
        props.setAnchorMenu(null);
    }, [props]);

    const onCheckChatMembers = useCallback(() => {
        dispatch(checkChatMembers(props.selectedChatId));
        props.setDialogMode(DIALOG_MODE.CHECK_MEMBERS);
    }, [dispatch, props]);

    const onAddUserToChatDialog = useCallback(() => {
        const onAddUserToChat = (login: string) => {
            dispatch(addUserToChat({ login, selectedChatId: props.selectedChatId }));
            props.setDialogMode(DIALOG_MODE.EXIT);
        };
        props.setDialogMode({ ...DIALOG_MODE.ADD_TO_CHAT, positiveBtnFunc: onAddUserToChat });
    }, [dispatch, props]);

    const onDeleteUserFromChatDialog = useCallback(() => {
        const onDeleteUserFromChat = (login: string) => {
            dispatch(deleteUserFromChat(login, props.selectedChatId));
            props.setDialogMode(DIALOG_MODE.EXIT);
        };
        props.setDialogMode({ ...DIALOG_MODE.DELETE_FROM_CHAT, positiveBtnFunc: onDeleteUserFromChat });
    }, [dispatch, props]);

    const onDeleteChatDialog = useCallback(() => {
        const onDeleteChat = () => {
            dispatch(deleteChat(props.selectedChatId));
            props.setDialogMode(DIALOG_MODE.EXIT);
            props.onClearActiveChat();
        };
        props.setDialogMode({ ...DIALOG_MODE.DELETE_CHAT, positiveBtnFunc: onDeleteChat });
    }, [dispatch, props]);

    return (
        <Menu
            id="long-menu"
            anchorEl={props.anchorMenu}
            keepMounted
            open={!!props.anchorMenu}
            onClick={onCloseMenu}
        >
            <MenuItem onClick={onAddUserToChatDialog} className={styles.icons}>
                Add user to chat
            </MenuItem>
            <MenuItem onClick={onDeleteUserFromChatDialog} className={styles.icons}>
                Delete user from chat
            </MenuItem>
            <MenuItem onClick={onDeleteChatDialog} className={styles.icons}>
                Delete chat
            </MenuItem>
            <MenuItem onClick={onCheckChatMembers} className={styles.icons}>
                Check members
            </MenuItem>
        </Menu>
    );
};
