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
                    Chats...
                </div>
            </div>
        );
    }
}

export const LeftChat = connect(state => ({ userName: state.user.name }))(LeftChatComponent);
