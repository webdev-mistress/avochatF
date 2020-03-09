import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import { logoutUser } from '../../../store/user/actions';
import { getActiveChat, requestMessages, clearChat } from '../../../store/chat/actions';

import { selectUserName, selectUserChats } from '../../../store/user/selectors';

import styles from './styles.module.scss';
import { selectActiveChatId } from '../../../store/chat/selectors';

export const LeftChat = () => {
    const userName = useSelector(selectUserName);
    const chats = useSelector(selectUserChats);
    const activeChatId = useSelector(selectActiveChatId);
    const dispatch = useDispatch();

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

    return (
        <div className={styles.wrapper}>
            <div className={styles.topBlockWrapper}>
                <div
                    className={styles.logoutWrapper}
                    onClick={onAuthLogout}
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
