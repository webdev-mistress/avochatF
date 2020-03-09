import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import { logoutUser } from '../../../store/user/actions';
import { getActiveChat, requestMessages, clearChat } from '../../../store/chat/actions';

import { selectUserName, selectUserChats } from '../../../store/user/selectors';

import styles from './styles.module.scss';
import { selectActiveChatId } from '../../../store/chat/selectors';

export const LeftChat = () => {
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

    const userName = useSelector(selectUserName);
    const chats = useSelector(selectUserChats);
    const activeChatId = useSelector(selectActiveChatId);
    const dispatch = useDispatch();

    const onDialogOpen = () => {
        setOpenLogoutDialog(true);
      };

    const onDialogClose = () => {
        setOpenLogoutDialog(false);
    };

    const onLoadChat = (chat) => {
        dispatch(getActiveChat(chat));
        dispatch(requestMessages(chat.chatId));
    };

    const onAuthLogout = () => {
        dispatch(logoutUser());
        dispatch(clearChat());
    };

    const onClearActiveChat = () => {
        dispatch(clearChat());
    };

    const renderDialog = () => (
        <Dialog
            open={openLogoutDialog}
            onClose={onDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{'Are you sure you want to logout?'}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                        Maybe you want to continue chatting?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onDialogClose} color="primary">
                        Back to chat
                </Button>
                <Button onClick={onAuthLogout} color="primary" autoFocus>
                        Logout
                </Button>
            </DialogActions>
        </Dialog>
    );

    return (
        <div className={styles.wrapper}>
            {renderDialog()}
            <div className={styles.topBlockWrapper}>
                <div
                    className={styles.logoutWrapper}
                    onClick={onDialogOpen}
                >
                    <ExitToAppIcon />
                </div>
                <div
                    className={styles.topBlock}
                    onClick={onClearActiveChat}
                >
                    {userName}
                </div>
            </div>
            <div className={styles.mainBlock}>
                <List className={styles.root}>
                    {chats.map((chat) => {
                        const chatIsActive = chat.chatId === activeChatId;

                        return (
                            <ListItem
                                className={cn(styles.chatItem, chatIsActive && styles.chatItemActive)}
                                key={chat.chatId}
                                onClick={() => onLoadChat(chat)}
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        className={styles.avatar}
                                        alt={chat.name}
                                        src="/static/images/avatar/3.jpg"
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    className={styles.chatItemText}
                                    primary={chat.name}
                                    secondary={'Chat'}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </div>
        </div>
    );
};
