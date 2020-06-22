import React, { useState } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';

import { deleteUserFromChat } from '../../../redux/api';
import { logoutUser, addUserToChat } from '../../../redux/store/user/actions';
import { getActiveChat, requestMessages, clearChat, createChat, deleteChat } from '../../../redux/store/chat/actions';
import { selectActiveChatId } from '../../../redux/store/chat/selectors';
import { selectUserName, selectUserChats } from '../../../redux/store/user/selectors';
import { FormDialog, AlertDialog } from '../../../components/Dialog';

import styles from './styles.module.scss';

export const LeftChat = () => {
    const [anchorMenu, setAnchorMenu] = useState(null);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [dialogMode, setDialogMode] = useState({});

    const userName = useSelector(selectUserName);
    const chats = useSelector(selectUserChats);
    const activeChatId = useSelector(selectActiveChatId);
    const dispatch = useDispatch();

    const onOpenMenu = (event, chatId) => {
      setAnchorMenu(event.currentTarget);
      setSelectedChatId(chatId);
    };

    const onCloseMenu = () => setAnchorMenu(null);

    const onLoadChat = (event, chat) => {
        const { nodeName } = event.target;
        if (nodeName !== 'path' && nodeName !== 'svg') {
            dispatch(getActiveChat(chat));
            dispatch(requestMessages(chat.chatId));
        }
    };

    const onCreateChat = (chatName) => {
        dispatch(createChat(chatName));
        setDialogMode(DIALOG_MODE.EXIT);
    };

    const onAuthLogout = () => {
        dispatch(logoutUser());
        dispatch(clearChat());
    };

    const onClearActiveChat = () => dispatch(clearChat());

    const onAddUserToChat = (login) => {
        dispatch(addUserToChat({ login, selectedChatId }));
        setDialogMode(DIALOG_MODE.EXIT);
    };

    const onDeleteUserFromChat = (login) => {
        deleteUserFromChat(login, selectedChatId);
        setDialogMode(DIALOG_MODE.EXIT);
    };

    const onDeleteChat = () => {
        dispatch(deleteChat(selectedChatId));
        setDialogMode(DIALOG_MODE.EXIT);
    };

    const onAddUserToChatDialog = () => setDialogMode(DIALOG_MODE.ADD_TO_CHAT);

    const onDeleteUserFromChatDialog = () => setDialogMode(DIALOG_MODE.DELETE_FROM_CHAT);

    const onCreateChatDialog = () => setDialogMode(DIALOG_MODE.CREATE_CHAT);

    const onDeleteChatDialog = () => setDialogMode(DIALOG_MODE.DELETE_CHAT);

    const closeDialog = () => setDialogMode(DIALOG_MODE.EXIT);

    const DIALOG_MODE = {
        ADD_TO_CHAT: {
            form: true,
            title: `Write user's login here`,
            label: 'Login',
            positiveBtnText: 'Add user to chat',
            positiveBtnFunc: onAddUserToChat,
        },
        DELETE_FROM_CHAT: {
            form: true,
            title: `Write user's login here`,
            label: 'Login',
            positiveBtnText: 'Delete user from chat',
            positiveBtnFunc: onDeleteUserFromChat,
        },
        CREATE_CHAT: {
            form: true,
            title: `Write chat name here`,
            label: 'Chat name',
            positiveBtnText: 'Create chat',
            positiveBtnFunc: onCreateChat,
        },
        DELETE_CHAT: {
            form: false,
            title: 'Are you sure?',
            positiveBtnText: 'Delete chat',
            positiveBtnFunc: onDeleteChat,
        },
        LOGOUT: {
            form: false,
            title: 'Are you sure?',
            positiveBtnText: 'Logout',
            positiveBtnFunc: onAuthLogout,
        },
        EXIT: {},
    };

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

    const renderListItem = (chat, chatIsActive) => (
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
                    onClick={(event) => onOpenMenu(event, chat.chatId)}
                    className={styles.icons}
                />
            </div>
        </ListItem>
    );

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.topBlockWrapper}>
                    <div className={styles.logoutWrapper} onClick={() => setDialogMode(DIALOG_MODE.LOGOUT)}>
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
                isShow={!_.isEmpty(dialogMode) && dialogMode.form}
                title={dialogMode.title}
                label={dialogMode.label}
                positiveBtnText={dialogMode.positiveBtnText}
                onPositiveClick={dialogMode.positiveBtnFunc}
                closeDialog={closeDialog}
            />
        </>
    );
};
