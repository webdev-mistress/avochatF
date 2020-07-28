import React, { useCallback } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { MenuMessage } from '@/pages/chat/mainChat/components/menuMessage';
import { EditIcon } from '@/pages/chat/mainChat/components/editIcon';
import { IState } from '@/pages/chat/mainChat';
import { IMessage } from '@/types/store';
import styles from '../styles.module.scss';

interface IProps {
    isEditMessage: boolean,
    anchorEl: Element | null,
    setAnchorEl: (anchorEl: Element | null) => void,
    state: IState,
    setState: (state: IState) => void,
    message: IMessage,
    messageDateChange: string,
    onEditClose: () => void,
    onSendEditMessage: (content: string) => void,
}

export const SettingsMessage = (props: IProps) => {
    const { isEditMessage, anchorEl, setAnchorEl, state, setState, message,
        messageDateChange, onEditClose, onSendEditMessage } = props;

    const onOpenMenu = useCallback((event, message) => {
        setState({ ...state, selectedMessage: message });
        setAnchorEl(event.currentTarget);
    }, [setAnchorEl, setState, state]);

    if (isEditMessage) {
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
    }

    return (
        <>
            <MoreVertIcon
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={(event) => onOpenMenu(event, message)}
                className={styles.icons}
            />
            <div>
                <MenuMessage
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    state={state}
                    setState={setState}
                />
                <EditIcon messageDateChange={messageDateChange} />
            </div>
        </>
    );
};
