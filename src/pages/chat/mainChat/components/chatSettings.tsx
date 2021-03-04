import React from 'react';
import format from 'date-fns/format';
import styles from '@/pages/chat/mainChat/styles.module.scss';
import { SettingsMessage } from '@/pages/chat/mainChat/components/settingsMessage';
import { EditIcon } from '@/pages/chat/mainChat/components/editIcon';
import { IState } from '@/pages/chat/mainChat';
import { IMessage } from '@/types/store';

interface IProps {
    message: IMessage,
    anchorEl: Element | null,
    setAnchorEl: (anchorEl: Element | null) => void,
    userIsAuthor: boolean,
    isEditMessage: boolean,
    state: IState,
    setState: (state: IState) => void,
    onEditClose: () => void;
    onSendEditMessage: (content: string) => void,
}

export const ChatSettings = (props: IProps) => {
    const { message, isEditMessage, anchorEl, setAnchorEl , userIsAuthor, state, setState, onEditClose,
        onSendEditMessage } = props;
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
    ) : message.dateChange ? <EditIcon messageDateChange={messageDateChange} /> : <div />;
};
