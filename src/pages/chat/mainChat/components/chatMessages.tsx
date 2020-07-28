import React, { useCallback } from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import format from 'date-fns/format';
import cn from 'classnames';
import TextField from '@material-ui/core/TextField';
import { editMessage } from '@/redux/store/chat/actions';
import { IState } from '@/pages/chat/mainChat';
import { EditIcon } from '@/pages/chat/mainChat/components/editIcon';
import { SettingsMessage } from '@/pages/chat/mainChat/components/settingsMessage';
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

    const onEditMessageChange = useCallback((event) => {
        setState({
            ...state,
            messageEdit: event.target.value,
        });
    }, [setState, state]);

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

    const onPressEditEvent = useCallback((event, content) => {
        event.key === 'Enter' && onSendEditMessage(content);
        event.key === 'Escape' && onEditClose();
    }, [onEditClose, onSendEditMessage]);

    const renderMessageContent = (message: IMessage, isEditMessage: boolean) => isEditMessage ? (
        <TextField
            autoFocus
            className={styles.form}
            onChange={onEditMessageChange}
            onKeyUp={(event) => onPressEditEvent(event, message.message)}
            value={state.messageEdit}
        />
    ) : (<div>{message.message}</div>);

    const renderSettings = (message: IMessage, userIsAuthor: boolean, isEditMessage: boolean) => {
        const messageDateChange = message.dateChange
            ? format(new Date(message.dateChange), 'HH:mm:ss dd.MM.yyyy') : '';

        return userIsAuthor ? (
            <div className={styles.buttonBlock}>
                <SettingsMessage
                    isEditMessage={isEditMessage}
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    state={state}
                    setState={setState}
                    message={message}
                    messageDateChange={messageDateChange}
                    onEditClose={onEditClose}
                    onSendEditMessage={onSendEditMessage}
                />
            </div>
        ) : message.dateChange && <EditIcon messageDateChange={messageDateChange} />;
    };

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
                                {renderMessageContent(message, isEditMessage)}
                            </div>
                            {renderSettings(message, userIsAuthor, isEditMessage)}
                        </div>
                    </div>
                );
            })}
        </>
    );
};
