import React, { useCallback } from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import format from 'date-fns/format';
import cn from 'classnames';
import { editMessage } from '@/redux/store/chat/actions';
import { IState } from '@/pages/chat/mainChat';
import { ChatSettings } from '@/pages/chat/mainChat/components/chatSettings';
import { MessageContent } from '@/pages/chat/mainChat/components/messageContent';
import { IMessage } from '@/types/store';
import styles from '../styles.module.scss';

interface IProps {
    state: IState,
    setState: (state: IState) => void,
    messages: IMessage[],
    userId: number,
    anchorEl: Element | null,
    setAnchorEl: (anchorEl: Element | null) => void,
}

export const ChatMessages = (props: IProps) => {
    const dispatch: Dispatch = useDispatch();

    const { messages, state, userId, setState, setAnchorEl, anchorEl } = props;

    const onEditClose = useCallback(() => {
        setState({ ...state, isEditMode: false, message: null, messageEdit: '' });
    }, [setState, state]);

    const onSendEditMessage = useCallback((content) => {
        const { selectedMessage, messageEdit } = state;
        if(selectedMessage && content !== messageEdit) {
            dispatch(editMessage({ editMessageId: selectedMessage.messageId, messageEdit }));
        }
        onEditClose();
    }, [dispatch, onEditClose, state]);

    return (
        <>
            {messages.map(message => {
                const userIsAuthor = userId === message.author.userId;
                const messageDate = format(new Date(message.dateCreate), 'HH:mm:ss dd.MM.yyyy');
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
                                <MessageContent
                                    message={message}
                                    isEditMessage={isEditMessage}
                                    state={state}
                                    setState={setState}
                                    onSendEditMessage={onSendEditMessage}
                                    onEditClose={onEditClose}
                                />
                            </div>
                            <ChatSettings
                                message={message}
                                anchorEl={anchorEl}
                                setAnchorEl={setAnchorEl}
                                userIsAuthor={userIsAuthor}
                                isEditMessage={isEditMessage}
                                state={state}
                                setState={setState}
                                onEditClose={onEditClose}
                                onSendEditMessage={onSendEditMessage}
                            />
                        </div>
                    </div>
                );
            })}
        </>
    );
};
