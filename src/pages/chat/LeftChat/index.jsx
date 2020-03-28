import React, { useState } from 'react';
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

import { deleteUserFromChat } from '../../../api';
import { logoutUser, addUserToChat } from '../../../store/user/actions';
import { getActiveChat, requestMessages, clearChat } from '../../../store/chat/actions';
import { selectActiveChatId } from '../../../store/chat/selectors';
import { selectUserName, selectUserChats } from '../../../store/user/selectors';
import { FormDialog, AlertDialog } from '../../../components/Dialog';

import styles from './styles.module.scss';

const DIALOG_MODE = {
    ADD: 'add',
    DELETE: 'dialog',
};

export const LeftChat = () => {
    const [isShowLogoutDialog, setIsShowLogoutDialog] = useState(false);
    const [anchorMenu, setAnchorMenu] = useState(null);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [dialogMode, setDialogMode] = useState(null);

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

    const onAuthLogout = () => {
        dispatch(logoutUser());
        dispatch(clearChat());
    };

    const onClearActiveChat = () => dispatch(clearChat());

    const onAddUserToChat = (login) => {
        dispatch(addUserToChat({ login, selectedChatId }));
        setDialogMode(null);
    };

    const onDeleteUserFromChat = (login) => {
        deleteUserFromChat(login, selectedChatId);
        setDialogMode(null);
    };

    const onAddChatDialogOpen = () => setDialogMode(DIALOG_MODE.ADD);

    const onDeleteChatDialog = () => setDialogMode(DIALOG_MODE.DELETE);

    const closeDialog = () => setDialogMode(null);

    const renderMenu = () => (
        <Menu
            id="long-menu"
            anchorEl={anchorMenu}
            keepMounted
            open={!!anchorMenu}
            onClick={onCloseMenu}
        >
            <MenuItem onClick={onAddChatDialogOpen} className={styles.icons}>
                Add user to chat
            </MenuItem>
            <MenuItem onClick={onDeleteChatDialog} className={styles.icons}>
                Delete user from chat
            </MenuItem>
            <MenuItem className={styles.icons}>
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
                <AlertDialog
                    isShow={isShowLogoutDialog}
                    contentText="Maybe you want to continue chatting?"
                    nagativeBtnText="Back to chat"
                    positiveBtnText="Logout"
                    onClose={() => setIsShowLogoutDialog(false)}
                    onPositiveClick={onAuthLogout}
                />
                <div className={styles.topBlockWrapper}>
                    <div className={styles.logoutWrapper} onClick={() => setIsShowLogoutDialog(true)}>
                        <ExitToAppIcon />
                    </div>
                    <div className={styles.topBlock} onClick={onClearActiveChat}>
                        {userName}
                    </div>
                </div>
                <div className={styles.mainBlock}>
                    <List className={styles.root}>
                        {chats.map((chat) => renderListItem(chat, chat.chatId === activeChatId))}
                    </List>
                </div>
            </div>
            {renderMenu()}
            <FormDialog
                title={`Write user's login here`}
                isShowDialog={!!dialogMode}
                positiveBtnText={dialogMode === DIALOG_MODE.ADD ? 'Add user to chat' : 'Delete user from chat'}
                onPositiveClick={dialogMode === DIALOG_MODE.ADD ? onAddUserToChat : onDeleteUserFromChat}
                closeDialog={closeDialog}
            />
        </>
    );
};
