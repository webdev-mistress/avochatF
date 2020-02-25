import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './styles.module.sass';

class LeftChatComponent extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.topBlock}>
                    {this.props.userName}
                </div>
                <div className={styles.mainBlock}>
                    {this.props.chatsProps.map((chatItem, id) => (<div key={id.chatId}>{chatItem.name}</div>))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    userName: state.user.name,
    chatsProps: state.user.chats,
});

export const LeftChat = connect(mapStateToProps, null)(LeftChatComponent);
