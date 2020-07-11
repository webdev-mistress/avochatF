import React, { useCallback, useState } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import cn from 'classnames';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import { CircularProgress } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';

import { logoutUser, addUserToChat } from '@/redux/store/user/actions';
import {
    getActiveChat,
    requestMessages,
    clearChat,
    createChat,
    deleteChat,
    deleteUserFromChat
} from '@/redux/store/chat/actions';
// eslint-disable-next-line no-unused-vars
import { selectActiveChatId, selectIsCreateChatSpin } from '@/redux/store/chat/selectors';
import { selectUserName, selectUserChats } from '@/redux/store/user/selectors';
import { FormDialog, AlertDialog } from '@/components/dialog';

import styles from './styles.module.scss';
import { IDialogMode, IDialogModeElement } from '@/types/components';
import { IChat } from '@/types/store';

const DIALOG_MODE: IDialogMode = {
    ADD_TO_CHAT: {
        form: true,
        title: `Write user's login here`,
        label: 'Login',
        positiveBtnText: 'Add user to chat',
    },
    DELETE_FROM_CHAT: {
        form: true,
        title: `Write user's login here`,
        label: 'Login',
        positiveBtnText: 'Delete user from chat',
    },
    CREATE_CHAT: {
        form: true,
        title: `Write chat name here`,
        label: 'Chat name',
        positiveBtnText: 'Create chat',
    },
    DELETE_CHAT: {
        form: false,
        title: 'Are you sure?',
        positiveBtnText: 'Delete chat',
    },
    LOGOUT: {
        form: false,
        title: 'Are you sure?',
        positiveBtnText: 'Logout',
    },
    EXIT: {},
};

export const LeftChat = () => {
    const [anchorMenu, setAnchorMenu] = useState(null);
    const [selectedChatId, setSelectedChatId] = useState(0);
    const [dialogMode, setDialogMode] = useState<IDialogModeElement>({});

    const userName = useSelector(selectUserName);
    const chats: IChat[] = useSelector(selectUserChats);
    const activeChatId = useSelector(selectActiveChatId);
    // const isCreateChatSpin = useSelector(selectIsCreateChatSpin);
    const dispatch: Dispatch = useDispatch();

    const onOpenMenu = useCallback((event, chatId) => {
        setAnchorMenu(event.currentTarget);
        setSelectedChatId(chatId);
    }, []);

    const onCloseMenu = useCallback(() => {
        setAnchorMenu(null);
    }, []);

    const onLoadChat = useCallback((event, chat) => {
        const { nodeName } = event.target;
        if (nodeName !== 'path' && nodeName !== 'svg') {
            dispatch(getActiveChat(chat));
            dispatch(requestMessages(chat.chatId));
        }
    }, [dispatch]);

    const onCreateChat = useCallback((chatName) => {
        dispatch(createChat(chatName));
        setDialogMode(DIALOG_MODE.EXIT);
    }, [dispatch]);

    const onAuthLogout = useCallback(() => {
        dispatch(logoutUser());
        dispatch(clearChat());
    }, [dispatch]);

    const onClearActiveChat = useCallback(() => {
        dispatch(clearChat());
    }, [dispatch]);

    const onAddUserToChat = useCallback((login) => {
        dispatch(addUserToChat({ login, selectedChatId }));
        setDialogMode(DIALOG_MODE.EXIT);
    }, [dispatch, selectedChatId]);

    const onDeleteUserFromChat = useCallback((login) => {
        dispatch(deleteUserFromChat(login, selectedChatId));
        setDialogMode(DIALOG_MODE.EXIT);
    }, [dispatch, selectedChatId]);

    const onDeleteChat = useCallback(() => {
        dispatch(deleteChat(selectedChatId));
        setDialogMode(DIALOG_MODE.EXIT);
    }, [dispatch, selectedChatId]);

    const onAddUserToChatDialog = useCallback(() => {
        setDialogMode({ ...DIALOG_MODE.ADD_TO_CHAT, positiveBtnFunc: onAddUserToChat });
    }, [onAddUserToChat]);

    const onDeleteUserFromChatDialog = useCallback(() => {
        setDialogMode({ ...DIALOG_MODE.DELETE_FROM_CHAT, positiveBtnFunc: onDeleteUserFromChat });
    }, [onDeleteUserFromChat]);

    const onCreateChatDialog = useCallback(() => {
        setDialogMode({ ...DIALOG_MODE.CREATE_CHAT, positiveBtnFunc: onCreateChat });
    }, [onCreateChat]);

    const onDeleteChatDialog = useCallback(() => {
        setDialogMode({ ...DIALOG_MODE.DELETE_CHAT, positiveBtnFunc: onDeleteChat });
    }, [onDeleteChat]);

    const closeDialog = useCallback(() => {
        setDialogMode(DIALOG_MODE.EXIT);
    }, []);

    const renderMenu = () => (
        <Menu
            id="long-menu"
            anchorEl={anchorMenu}
            keepMounted
            open={!!anchorMenu}
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
        </Menu>
    );

    const renderListItem = (chat: IChat, chatIsActive: boolean) => (
        <ListItem
            className={cn(styles.chatItem, chatIsActive && styles.chatItemActive)}
            key={chat.chatId}
            onClick={(event) => onLoadChat(event, chat)}
        >
            <ListItemAvatar>
                <Avatar className={styles.avatar} alt={chat.name} src="/static/invalide.path" />
            </ListItemAvatar>
            <ListItemText
                className={styles.chatItemText}
                primary={chat.name}
                secondary={'Chat'}
            />
            <div>
                <MoreVertIcon
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={(event: any) => onOpenMenu(event, chat.chatId)}
                    className={styles.icons}
                />
            </div>
        </ListItem>
    );

    return (
        <>
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
                    <List className={styles.list}>
                        {chats.map((chat) => renderListItem(chat, chat.chatId === activeChatId))}
                        <Button onClick={onCreateChatDialog} color="primary">
                            {'Create chat'}
                        </Button>
                    </List>
                </div>
            </div>
            {renderMenu()}
            <AlertDialog
                isShow={!_.isEmpty(dialogMode) && !dialogMode.form}
                title={dialogMode.title}
                positiveBtnText={dialogMode.positiveBtnText}
                onClose={closeDialog}
                onPositiveClick={dialogMode.positiveBtnFunc}
            />
            <FormDialog
                isShow={!_.isEmpty(dialogMode) && !!dialogMode.form}
                title={dialogMode.title}
                label={dialogMode.label}
                positiveBtnText={dialogMode.positiveBtnText}
                onPositiveClick={dialogMode.positiveBtnFunc}
                closeDialog={closeDialog}
            />
        </>
    );
};
