import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './styles.module.sass';
import { getActiveChat } from '../../../store/chat/actions';

class LeftChatComponent extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.topBlock}>
                    {this.props.userName}
                </div>
                <div className={styles.mainBlock}>
                    {this.props.chatsProps.map((chatItem) => (
                        <div onClick={() => this.props.getActiveChat(chatItem)} key={chatItem.chatId}>
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
});

export const LeftChat = connect(mapStateToProps, mapDispatchToProps)(LeftChatComponent);
