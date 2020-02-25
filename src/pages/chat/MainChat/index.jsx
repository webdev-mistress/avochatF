import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { selectActiveChat, selectMessages } from '../../../store/chat/selectors';
import { sendMessage, getMessages as getMessagesFromApi } from '../../../api';

import { getMessages } from '../../../store/chat/actions';

import styles from './styles.module.sass';
import { selectUserId } from '../../../store/user/selectors';

export class MainChatComponent extends Component {
    state = {
        messageText: '',
    }

    componentDidMount() {
        this.intervalCheckMessage = setInterval(() => {
            const { activeChat } = this.props;

            if(activeChat) {
                getMessagesFromApi(activeChat.chatId)
                    .then(({ messages }) => this.props.getMessages(messages));
            }
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalCheckMessage);
    }

    onSendMessage = () => {
        const { userId, activeChat } = this.props;

        sendMessage(userId, activeChat.chatId, this.state.messageText);
        this.setState({ messageText: '' });
    }

    onChangeMessage = e => this.setState({ messageText: e.target.value })

    render() {
        return (
            <div className={styles.wrapper}>
                {!_.isEmpty(this.props.activeChat) ? (
                    <div>
                        <div>{`Active chat: ${this.props.activeChat.name}`}</div>
                        {this.props.messages.map(message => (
                            <div key={message.messageId}>
                                {`${message.author.login}: ${message.content}`}
                            </div>
                        ))}
                        <input type="text" onChange={this.onChangeMessage} value={this.state.messageText} />
                        <button onClick={this.onSendMessage}>Send message</button>
                    </div>
                ) : <div>Choose a chat</div>}
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
    getMessages: (messages) => dispatch(getMessages(messages)),
});

export const MainChat = connect(mapStateToProps, mapDispatchToProps)(MainChatComponent);
