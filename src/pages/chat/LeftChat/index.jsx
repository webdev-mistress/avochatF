import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './styles.module.sass';
import { getActiveChat, getMessages } from '../../../store/chat/actions';
import { getMessages as getMessagesFromApi } from '../../../api';

class LeftChatComponent extends Component {
    onLoadChat = (chatItem) => {
        this.props.getActiveChat(chatItem);
        getMessagesFromApi(chatItem.chatId)
            .then(({ messages }) => this.props.getMessages(messages));
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.topBlock}>
                    {this.props.userName}
                </div>
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
});

export const LeftChat = connect(mapStateToProps, mapDispatchToProps)(LeftChatComponent);
