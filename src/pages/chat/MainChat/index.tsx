import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import cn from 'classnames';
import format from 'date-fns/format';

import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import CloseIcon from '@material-ui/icons/Close';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { selectActiveChat, selectMessages } from '@/redux/store/chat/selectors';
import { selectUserId } from '@/redux/store/user/selectors';
import { sendMessage, deleteMessage, editMessage } from '@/redux/store/chat/actions';

import styles from './styles.module.scss';
import { Dispatch } from 'redux';
import { IMessage } from '@/types/store';

interface IState {
    messageText: string,
    isEditMode: boolean,
    selectedMessage: IMessage | null,
    message: IMessage | null,
    messageEdit: string,
    isRefreshing: boolean,
}

export const MainChat = () => {
    const initialState: IState = {
        messageText: '',
        isEditMode: false,
        selectedMessage: null,
        messageEdit: '',
        message: null,
        isRefreshing: false,
    };

    const [state, setState] = useState(initialState);
    const dispatch: Dispatch = useDispatch();
    const userId = useSelector(selectUserId);
    const activeChat = useSelector(selectActiveChat);
    const messages = useSelector(selectMessages);
    const messageScroll = useRef<HTMLInputElement>(null);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if(messageScroll.current){
            messageScroll.current.scrollTop = 999999;
        }
    });

    const onOpenMenu = useCallback((event, message) => {
        setState({ ...state, selectedMessage: message });
        setAnchorEl(event.currentTarget);
    }, [state]);

    const onCloseMenu = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const onSendMessage = useCallback(() => {
        if(!state.messageText) {
            return;
        }
        dispatch(sendMessage(state.messageText));
        setState({ ...state, messageText: '' });
    }, [dispatch, state]);

    const onPressEvent = useCallback((event) => {
        onCloseMenu();

        event.key === 'ArrowUp' && setTimeout(() => {
            const editedLastInfo = _.findLast(messages, (message) => message.author.userId === userId);

            setState({
                ...state,
                isEditMode: true,
                selectedMessage: editedLastInfo || null,
                messageEdit: editedLastInfo ? editedLastInfo.message : '',
            });
        }, 0);
        event.key === 'Enter' && onSendMessage();
        event.key === 'Escape' && event.target.blur();
    }, [messages, onCloseMenu, onSendMessage, state, userId]);

    const onEditClose = useCallback(() => {
        setState({ ...state, isEditMode: false, message: null, messageEdit: '' });
    }, [state]);

    const onSendEditMessage = useCallback((content) => {
        const { selectedMessage, messageEdit } = state;
        if(selectedMessage && content !== messageEdit) {
            dispatch(editMessage({ editMessageId: selectedMessage.messageId, messageEdit }));
        }
        onEditClose();
    }, [dispatch, onEditClose, state]);

    const onPressEditEvent = useCallback((event, content) => {
        event.key === 'Enter' && onSendEditMessage(content);
        event.key === 'Escape' && onEditClose();
    }, [onEditClose, onSendEditMessage]);

    const onChangeMessage = useCallback((event) => {
        setState({ ...state, messageText: event.target.value });
    }, [state]);

    const onEditMode = useCallback(() => {
        onCloseMenu();

        setTimeout(() => {
            setState({
                ...state,
                isEditMode: true,
                messageEdit: _.get(state,'selectedMessage.message', ''),
            });
        }, 0);
    }, [onCloseMenu, state]);

    const onEditMessageChange = useCallback((event) => {
        setState({
            ...state,
            messageEdit: event.target.value,
        });
    }, [state]);

    const renderMenu = () => (
        <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClick={onCloseMenu}
        >
            <MenuItem
                onClick={() => onEditMode()}
                className={styles.icons}
            >
                Edit
            </MenuItem>
            <MenuItem
                onClick={() => dispatch(deleteMessage(_.get(state, 'selectedMessage.messageId', 0)))}
                className={styles.icons}
            >
                Delete
            </MenuItem>
        </Menu>
    );

    const renderEditIcon = (message: IMessage, messageDateChange: string) => (
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

        const messageDate = format(new Date(message.dateCreate), 'HH:mm:ss dd.MM.yyyy');
        const messageDateChange = message.dateChange
            ? format(new Date(message.dateChange), 'HH:mm:ss dd.MM.yyyy') : '';
        const isEditMessage = state.isEditMode
            && (_.get(state, 'selectedMessage.messageId', 0) === message.messageId);

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
                                onKeyUp={(event) => onPressEditEvent(event, message.message)}
                                value={state.messageEdit}
                            />
                        ) : (<div>{message.message}</div>)}
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
                                        {message.message !== state.messageEdit &&
                                            (<SendIcon
                                                onClick={() => onSendEditMessage(message.message)}
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
                                            onClick={(event: any) => onOpenMenu(event, message)}
                                            className={styles.icons}
                                        />
                                        <div>
                                            {renderMenu()}
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

    const hasActiveChat = !_.isEmpty(activeChat);
    const hasMessages = !_.isEmpty(messages);

    return (
        <div className={styles.wrapper}>
            <div className={styles.topBlock}>
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
                            onKeyUp={onPressEvent}
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
