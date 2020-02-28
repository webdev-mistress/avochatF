import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import { logoutUser } from '../../../store/user/actions';
import { getActiveChat, requestMessages } from '../../../store/chat/actions';

import styles from './styles.module.sass';
import { selectUserName, selectUserChats } from '../../../store/user/selectors';

class LeftChatComponent extends Component {
    onLoadChat = (chat) => {
        this.props.getActiveChat(chat);
        this.props.requestMessages(chat.chatId);
    }

    onAuthLogout = () => {
        this.props.logoutUser();
    };

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.topBlockWrapper}>
                    <div
                        className={styles.logoutWrapper}
                        onClick={this.onAuthLogout}
                    >
                        <ExitToAppIcon />
                    </div>
                    <div className={styles.topBlock}>
                        {this.props.userName}
                    </div>
                </div>
                <div className={styles.mainBlock}>
                    <List className={styles.root}>
                        {this.props.chats.map((chat) => (
                            <ListItem
                                className={styles.chatItem}
                                key={chat.chatId}
                                onClick={() => this.onLoadChat(chat)}
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
                                    secondary={'Chat'} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    userName: selectUserName(state),
    chats: selectUserChats(state),
});

const mapDispatchToProps = dispatch => ({
    getActiveChat: (chatId) => dispatch(getActiveChat(chatId)),
    requestMessages: (chatId) => dispatch(requestMessages(chatId)),
    logoutUser: () => dispatch(logoutUser()),
});

export const LeftChat = connect(mapStateToProps, mapDispatchToProps)(LeftChatComponent);
