import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

import styles from './styles.module.sass';
import { logoutUser } from '../../../store/user/actions';
import { getActiveChat, getMessages } from '../../../store/chat/actions';
import { getMessages as getMessagesFromApi } from '../../../api';

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
                    {this.props.chatsProps.map((chatItem) => (
                        <div onClick={() => this.onLoadChat(chatItem)} key={chatItem.chatId}>
                            {chatItem.name}
                        </div>)
                    )}
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
