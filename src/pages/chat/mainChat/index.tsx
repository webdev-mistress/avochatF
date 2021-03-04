import React, { useState, useRef, useCallback, useEffect } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import { selectUserId } from '@/redux/store/user/selectors';
import { selectActiveChat, selectMessages } from '@/redux/store/chat/selectors';
import { sendMessage } from '@/redux/store/chat/actions';
import { EmptyChat } from '@/pages/chat/mainChat/components/emptyChat';
import { ChatMessages } from '@/pages/chat/mainChat/components/chatMessages';
import { IMessage } from '@/types/store';
import styles from './styles.module.scss';

export interface IState {
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

    const [anchorEl, setAnchorEl] = useState<Element | null>(null);

    useEffect(() => {
        if(messageScroll.current){
            messageScroll.current.scrollTop = 999999;
        }
    }, [messages, messageScroll]);

    const onSendMessage = useCallback(() => {
        if(!state.messageText) {
            return;
        }
        dispatch(sendMessage(state.messageText));
        setState({ ...state, messageText: '' });
    }, [dispatch, state]);

    const onPressEvent = useCallback((event) => {
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
    }, [messages, onSendMessage, state, userId]);

    const onChangeMessage = useCallback((event) => {
        setState({ ...state, messageText: event.target.value });
    }, [state]);

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
                        {hasMessages
                            ? (
                                <ChatMessages
                                    state={state}
                                    setState={setState}
                                    messages={messages}
                                    userId={userId}
                                    anchorEl={anchorEl}
                                    setAnchorEl={setAnchorEl}
                                />)
                            : <EmptyChat />}
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
