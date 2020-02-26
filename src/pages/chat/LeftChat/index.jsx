import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import { logoutUser } from '../../../store/user/actions';
import { getActiveChat, getMessages } from '../../../store/chat/actions';
import { getMessages as getMessagesFromApi } from '../../../api';

import styles from './styles.module.sass';

class LeftChatComponent extends Component {
    onLoadChat = (chatItem) => {
        this.props.getActiveChat(chatItem);
        getMessagesFromApi(chatItem.chatId)
            .then(({ messages }) => this.props.getMessages(messages));
    }

    onAuthLogout = () => {
        this.props.logoutUser();
    };

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.topBlock}>
                    {this.props.userName}
                </div>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={this.onAuthLogout}
                >
                    Log out
                </Button>
                <div className={styles.mainBlock}>
                    <List className={styles.root}>
                        {this.props.chatsProps.map((chatItem) => (
                            <ListItem
                                className={styles.chatItem}
                                key={chatItem.chatId}
                                onClick={() => this.onLoadChat(chatItem)}
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        className={styles.avatar}
                                        alt={chatItem.name}
                                        src="/static/images/avatar/3.jpg"
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    className={styles.chatItemText}
                                    primary={chatItem.name}
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
    userName: state.user.name,
    chatsProps: state.user.chats,
});

const mapDispatchToProps = dispatch => ({
    getActiveChat: (chatId) => dispatch(getActiveChat(chatId)),
    getMessages: (messages) => dispatch(getMessages(messages)),
    logoutUser: () => dispatch(logoutUser()),
});

export const LeftChat = connect(mapStateToProps, mapDispatchToProps)(LeftChatComponent);
