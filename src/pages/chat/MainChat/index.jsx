import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import cn from 'classnames';
import format from 'date-fns/format';

import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import CachedIcon from '@material-ui/icons/Cached';
import CloseIcon from '@material-ui/icons/Close';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { selectActiveChat, selectMessages } from '../../../store/chat/selectors';
import { selectUserId } from '../../../store/user/selectors';
import { requestMessages, sendMessage, deleteMessage, editMessage } from '../../../store/chat/actions';

import styles from './styles.module.scss';

export const MainChat = () => {
    const initialState = {
        messageText: '',
        isEditMode: false,
    };

    const [state, setState] = useState(initialState);
    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);
    const activeChat = useSelector(selectActiveChat);
    const messages = useSelector(selectMessages);
    const messageScroll = useRef(null);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if(messageScroll.current){
            messageScroll.current.scrollTop = 999999;
        }
    });

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
        setAnchorEl(null);
      };

    const onSendMessage = () => {
        if(!state.messageText) {
            return;
        }
        dispatch(sendMessage(state.messageText));
        setState({ ...state, messageText: '' });
    };

    const onPressEnter = event => event.key === 'Enter' && onSendMessage();

    const onPressEditEnter = (event, content) => event.key === 'Enter' && onSendEditMessage(content);

    const onChangeMessage = event => setState({ ...state, messageText: event.target.value });

    const onRefreshChat = () => {
        setState({ ...state, isRefreshing: true });
        setTimeout(() => setState({ ...state, isRefreshing: false }), 2100);
        dispatch(requestMessages(activeChat.chatId));
    };

    const onEditMode = ({ messageId, content }) => {
        handleClose();

        setTimeout(() => {
            setState({
                ...state,
                isEditMode: true,
                editMessageId: messageId,
                messageEdit: content,
            });
        }, 0);
    };

    const onEditClose = () => setState({ ...state, isEditMode: false, editMessageId: -1, messageEdit: '' });

    const onEditMessageChange = (event) => {
        setState({
            ...state,
            messageEdit: event.target.value,
        });
    };

    const onSendEditMessage = (content) => {
        const { editMessageId, messageEdit } = state;

        if(content === messageEdit){
            return onEditClose();
        }

        dispatch(editMessage({ editMessageId, messageEdit }));
        onEditClose();
    };

    const renderMenu = (message) => (
        <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClick={handleClose}
        >
            <MenuItem
                onClick={() => onEditMode(message)}
                className={styles.icons}
            >
                Edit
            </MenuItem>
            <MenuItem
                onClick={() => dispatch(deleteMessage(message.messageId))}
                className={styles.icons}
            >
                Delete
            </MenuItem>
        </Menu>
    );

    const renderEditIcon = (message, messageDateChange) => (
        message.dateChange && (
            <Tooltip
                title={messageDateChange}
                placement="right-start"
            >
                <BorderColorIcon
                    className={styles.editIcon}
                />
            </Tooltip>
        )
    );

    const renderNoMessages = () => (<div className={styles.noMessage}>You have no messages</div>);

    const renderMessages = () => messages.map(message => {
        const userIsAuthor = userId === message.author.userId;

        const messageDate = format(new Date(message.dateCreate), 'HH:mm:ss DD.MM.YYYY');
        const messageDateChange = message.dateChange ? format(new Date(message.dateChange), 'HH:mm:ss DD.MM.YYYY') : '';
        const isEditMessage = state.isEditMode && state.editMessageId === message.messageId;

        return (
            <div
                key={message.messageId}
                className={cn(styles.messageContainer, userIsAuthor && styles.myMessageWrapper)}
            >
                <div className={styles.dateWrapper}>{messageDate}</div>
                <div className={cn(styles.message, userIsAuthor && styles.myMessage)}>
                    <div className={styles.messageBlock}>
                        <div>{message.author.name}</div>
                        {isEditMessage ? (
                            <TextField
                                autoFocus
                                className={styles.form}
                                onChange={onEditMessageChange}
                                onKeyUp={(event) => onPressEditEnter(event, message.content)}
                                value={state.messageEdit}
                            />
                        ) : (<div>{message.content}</div>)}
                    </div>
                    {userIsAuthor ? (
                        <div className={styles.buttonBlock}>
                            {isEditMessage ?
                                (
                                    <>
                                        <CloseIcon
                                            onClick={onEditClose}
                                            className={styles.icons}
                                        />
                                        {message.content !== state.messageEdit &&
                                            (<SendIcon
                                                onClick={() => onSendEditMessage(message.content)}
                                                className={styles.icons}
                                            />)
                                        }
                                    </>
                                ) :
                                (
                                    <>
                                        <MoreVertIcon
                                            aria-label="more"
                                            aria-controls="long-menu"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                            className={styles.icons}
                                        />
                                        <div>
                                            {renderMenu(message)}
                                            {renderEditIcon(message, messageDateChange)}
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    ) : message.dateChange && renderEditIcon(message, messageDateChange)}
                </div>
            </div>
        );
    });

    const { isRefreshing } = state;
    const hasActiveChat = !_.isEmpty(activeChat);
    const hasMessages = !_.isEmpty(messages);

    return (
        <div className={styles.wrapper}>
            <div className={styles.topBlock}>
                {hasActiveChat && (
                    <CachedIcon
                        className={cn(styles.cachedIcon, isRefreshing && styles.activeCachedIcon)}
                        onClick={onRefreshChat}
                    />
                )}
                <div className={styles.title}>
                    {hasActiveChat ? `Active chat: ${activeChat.name}` : 'Choose a chat'}
                </div>
            </div>
            {hasActiveChat && (
                <>
                    <div ref={messageScroll} className={styles.messageWrapper}>
                        {hasMessages ? renderMessages() : renderNoMessages()}
                    </div>
                    <div className={styles.form}>
                        <TextField
                            autoFocus
                            id="standard-basic"
                            color="primary"
                            label="Enter Your Message"
                            onChange={onChangeMessage}
                            onKeyUp={onPressEnter}
                            value={state.messageText}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onSendMessage}
                            disabled={!state.messageText}
                        >
                            <SendIcon />
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};
