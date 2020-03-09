import React from 'react';
import { connect } from 'react-redux';
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
import { selectActiveChatId, selectActiveChat } from '../../../store/chat/selectors';

const LeftChatComponent = (props) => {
    const onLoadChat = (chat) => {
        props.getActiveChat(chat);
        props.requestMessages(chat.chatId);
    };

    const onAuthLogout = () => {
        props.logoutUser();
        props.clearChat();
    };

    const onClearActiveChat = () => {
        props.clearChat();
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
                    {props.userName}
                </div>
            </div>
            <div className={styles.mainBlock}>
                <List className={styles.root}>
                    {props.chats.map((chat) => {
                        const chatIsActive = chat.chatId === props.activeChatId;

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

const mapStateToProps = (state) => ({
    userName: selectUserName(state),
    chats: selectUserChats(state),
    activeChatId: selectActiveChatId(state),
    activeChat: selectActiveChat(state),
});

const mapDispatchToProps = dispatch => ({
    getActiveChat: (chatId) => dispatch(getActiveChat(chatId)),
    requestMessages: (chatId) => dispatch(requestMessages(chatId)),
    logoutUser: () => dispatch(logoutUser()),
    clearChat: () => dispatch(clearChat()),
});

export const LeftChat = connect(mapStateToProps, mapDispatchToProps)(LeftChatComponent);
