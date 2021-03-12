import React from 'react';
import SendIcon from '@material-ui/icons/Send';
import CloseIcon from '@material-ui/icons/Close';
import styles from '@/pages/chat/mainChat/styles.module.scss';
import { IState } from '@/pages/chat/mainChat';
import { IMessage } from '@/types/store';

interface IProps {
    state: IState,
    message: IMessage,
    onEditClose: () => void,
    onSendEditMessage: (content: string) => void,
}

export const OptionIcons = (props: IProps) => {
    const { state, message, onEditClose, onSendEditMessage } = props;

    return (
        <>
            <CloseIcon
                onClick={onEditClose}
                className={styles.icons}
            />
            {message.message !== state.messageEdit && (
                <SendIcon
                    onClick={() => onSendEditMessage(message.message)}
                    className={styles.icons}
                />
            )}
        </>
    );
};
