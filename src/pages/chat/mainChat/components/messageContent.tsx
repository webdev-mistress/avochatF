import React, { useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import styles from '@/pages/chat/mainChat/styles.module.scss';
import { IState } from '@/pages/chat/mainChat';
import { IMessage } from '@/types/store';

interface IProps {
    message: IMessage,
    isEditMessage: boolean,
    state: IState,
    setState: (state: IState) => void,
    onEditClose: () => void;
    onSendEditMessage: (content: string) => void,
}

export const MessageContent = (props: IProps) => {
    const { message, isEditMessage, state, setState, onEditClose, onSendEditMessage } = props;
    const onPressEditEvent = useCallback((event, content) => {
        event.key === 'Enter' && onSendEditMessage(content);
        event.key === 'Escape' && onEditClose();
    }, [onEditClose, onSendEditMessage]);

    const onEditMessageChange = useCallback((event) => {
        setState({
            ...state,
            messageEdit: event.target.value,
        });
    }, [setState, state]);

    return isEditMessage ? (
        <TextField
            autoFocus
            className={styles.form}
            onChange={onEditMessageChange}
            onKeyUp={(event) => onPressEditEvent(event, message.message)}
            value={state.messageEdit}
        />
    ) : (<div>{message.message}</div>);
};
