import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LeftChat } from './LeftChat';
import { MainChat } from './MainChat';
import styles from './styles.module.scss';

class ChatPageComponent extends Component {
    state = {
        status: 'offline',
        messages: [],
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <LeftChat />
                <MainChat />
            </div>
        );
    }
}

export const ChatPage = connect(state => ({ userName: state.user.name }))(ChatPageComponent);
