import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import cn from 'classnames';
import format from 'date-fns/format';

import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CachedIcon from '@material-ui/icons/Cached';
import CloseIcon from '@material-ui/icons/Close';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Tooltip from '@material-ui/core/Tooltip';

import { selectActiveChat, selectMessages } from '../../../store/chat/selectors';
import { selectUserId } from '../../../store/user/selectors';
import { requestMessages, sendMessage, deleteMessage, editMessage } from '../../../store/chat/actions';

import styles from './styles.module.scss';

export class MainChatComponent extends Component {
    state = {
        messageText: '',
        isEditMode: false,
    }

    componentDidMount() {
        this.intervalCheckMessage = setInterval(() => {
            if(!_.isEmpty(this.props.activeChat)) {
                this.requestMessages();
            }
        }, 200000);
    }

    componentDidUpdate() {
        if(this.messageWrapper){
            this.messageWrapper.scrollTop = 999999;
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalCheckMessage);
    }

    onSendMessage = () => {
        if(!this.state.messageText) {
            return;
        }
        this.props.sendMessage(this.state.messageText);
        this.setState({ messageText: '' });
    }

    onPressEnter = event => event.key === 'Enter' && this.onSendMessage();

    onPressEditEnter = (event, content) => event.key === 'Enter' && this.onSendEditMessage(content);

    onChangeMessage = event => this.setState({ messageText: event.target.value })

    onRefreshChat = () => {
        this.setState({ isRefreshing: true });
        setTimeout(() => this.setState({ isRefreshing: false }), 2100);
        this.requestMessages();
    }

    onEditMode = ({ messageId, content }) => {
        this.setState({
            isEditMode: true,
            editMessageId: messageId,
            messageEdit: content,
        });
    }

    onEditClose = () => this.setState({ isEditMode: false, editMessageId: -1, messageEdit: '' })

    onEditMessageChange = (event) => {
        this.setState({
            messageEdit: event.target.value,
        });
    }

    onSendEditMessage = (content) => {
        const { editMessageId, messageEdit } = this.state;

        if(content === messageEdit){
            return this.onEditClose();
        }

        this.props.editMessage({ editMessageId, messageEdit });
        this.onEditClose();
    }

    requestMessages = () => this.props.requestMessages(this.props.activeChat.chatId);

    renderNoMessages = () => (<div className={styles.noMessage}>You have no messages</div>);

    renderMessages = () => this.props.messages.map(message => {
        const userIsAuthor = this.props.userId === message.author.userId;

        const messageDate = format(new Date(message.dateCreate), 'HH:mm:ss DD.MM.YYYY');
        const messageDateChange = message.dateChange ? format(new Date(message.dateChange), 'HH:mm:ss DD.MM.YYYY') : '';
        const isEditMessage = this.state.isEditMode && this.state.editMessageId === message.messageId;

        return (
            <div
                key={message.messageId}
                className={cn(styles.messageContainer, userIsAuthor && styles.myMessageWrapper)}
            >
                <div className={styles.dateWrapper}>{messageDate}</div>
                <div
                    className={cn(styles.message, userIsAuthor && styles.myMessage)}
                >
                    <div className={styles.messageBlock}>
                        <div>{message.author.name}</div>
                        {isEditMessage ? (
                            <TextField
                                autoFocus
                                className={styles.form}
                                onChange={this.onEditMessageChange}
                                onKeyUp={(event) => this.onPressEditEnter(event, message.content)}
                                value={this.state.messageEdit}
                            />
                        ) : (
                            <div>{message.content}</div>
                        )}
                    </div>
                    {userIsAuthor && (
                    <div className={styles.buttonBlock}>
                        {isEditMessage ?
                            (
                                <>
                                    <CloseIcon
                                        onClick={this.onEditClose}
                                        className={styles.icons}
                                    />
                                    {message.content !== this.state.messageEdit &&
                                        (<SendIcon
                                            onClick={() => this.onSendEditMessage(message.content)}
                                            className={styles.icons}
                                        />)
                                    }
                                </>
                            ) :
                            (
                                <>
                                    {message.dateChange ? (
                                        <Tooltip
                                            title={messageDateChange}
                                            placement="right-start"
                                        >
                                            <BorderColorIcon
                                                onClick={() => this.onEditMode(message)}
                                                className={styles.icons}
                                            />
                                        </Tooltip>
                                    ) : (
                                        <EditIcon
                                            onClick={() => this.onEditMode(message)}
                                            className={styles.icons}
                                        />
                                    )}
                                    <DeleteIcon
                                        onClick={() => this.props.deleteMessage(message.messageId)}
                                        className={styles.icons}
                                    />
                                </>
                            )
                        }
                    </div>
                )}
                </div>
            </div>
        );
    });

    render() {
        const { isRefreshing } = this.state;
        const hasActiveChat = !_.isEmpty(this.props.activeChat);
        const hasMessages = !_.isEmpty(this.props.messages);

        return (
            <div className={styles.wrapper}>
                <div className={styles.topBlock}>
                    {hasActiveChat && (
                        <CachedIcon
                            className={cn(styles.cachedIcon, isRefreshing && styles.activeCachedIcon)}
                            onClick={this.onRefreshChat}
                        />
                    )}
                    <div className={styles.title}>
                        {hasActiveChat ? `Active chat: ${this.props.activeChat.name}` : 'Choose a chat'}
                    </div>
                </div>
                {hasActiveChat && (
                    <>
                        <div ref={(ref) => this.messageWrapper = ref} className={styles.messageWrapper}>
                            {hasMessages ? this.renderMessages() : this.renderNoMessages()}
                        </div>
                        <div className={styles.form}>
                            <TextField
                                autoFocus
                                id="standard-basic"
                                color="primary"
                                label="Enter Your Message"
                                onChange={this.onChangeMessage}
                                onKeyUp={this.onPressEnter}
                                value={this.state.messageText}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.onSendMessage}
                                disabled={!this.state.messageText}
                            >
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
    deleteMessage: (messageId) => dispatch(deleteMessage(messageId)),
    editMessage: (messageData) => dispatch(editMessage(messageData)),
});

export const MainChat = connect(mapStateToProps, mapDispatchToProps)(MainChatComponent);
