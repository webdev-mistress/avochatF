import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';

import { selectActiveChat, selectMessages } from '../../../store/chat/selectors';

import { selectUserId } from '../../../store/user/selectors';
import { requestMessages, sendMessage } from '../../../store/chat/actions';

import styles from './styles.module.sass';

export class MainChatComponent extends Component {
    state = {
        messageText: '',
    }

    componentDidMount() {
        this.intervalCheckMessage = setInterval(() => {
            if(!_.isEmpty(this.props.activeChat)) {
                this.props.requestMessages(this.props.activeChat.chatId);
            }
        }, 3000);
    }

    componentDidUpdate() {
        if(this.messageWrapper){
            this.messageWrapper.scrollTop = 9999;
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalCheckMessage);
    }

    onSendMessage = () => {
        this.props.sendMessage(this.state.messageText);
        this.setState({ messageText: '' });
    }

    onPressEnter = event => event.key === 'Enter' && this.onSendMessage();

    onChangeMessage = event => this.setState({ messageText: event.target.value })

    render() {
        const hasActiveChat = !_.isEmpty(this.props.activeChat);

        return (
            <div className={styles.wrapper}>
                <div className={styles.topBlock}>
                    {hasActiveChat ? `Active chat: ${this.props.activeChat.name}` : 'Choose a chat'}
                </div>
                { hasActiveChat && (
                    <>
                        <div ref={(ref) => this.messageWrapper = ref} className={styles.messageWrapper}>
                            {this.props.messages.map(message => (
                                <div
                                    key={message.messageId}
                                    className={`${styles.message} 
                                        ${this.props.userId === message.author.userId && styles.myMessage }`}
                                >
                                    {`${message.author.login}: ${message.content}`}
                                </div>
                            ))}
                        </div>
                        <div className={styles.form}>
                            <TextField
                                id="standard-basic"
                                color="primary"
                                label="Enter Your Message"
                                onChange={this.onChangeMessage}
                                onKeyUp={this.onPressEnter}
                                value={this.state.messageText}
                            />
                            <Button variant="contained" color="primary" onClick={this.onSendMessage}>
                                <SendIcon />
                            </Button>
                        </div>
                    </>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userId: selectUserId(state),
    activeChat: selectActiveChat(state),
    messages: selectMessages(state),
});

const mapDispatchToProps = dispatch => ({
    requestMessages: (chatId) => dispatch(requestMessages(chatId)),
    sendMessage: (messageText) => dispatch(sendMessage(messageText)),
});

export const MainChat = connect(mapStateToProps, mapDispatchToProps)(MainChatComponent);
