import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import IconButton from '@material-ui/core/IconButton';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import { MembersList } from '@/components/dialog/components/memberList';
import { clearChat, deleteChat, deleteUserFromChat, editOldChatName } from '@/redux/store/chat/actions';
import { selectSelectedChat, selectUserId } from '@/redux/store/user/selectors';
import { addUserToChat } from '@/redux/store/user/actions';
import { IDialogModeElement } from '@/types/components';
import { IChat } from '@/types/store';
import styles from '../styles.module.scss';

interface IProps {
    isShow: boolean,
    onClose: () => any,
    positiveBtnText: string,
    negativeBtnText: string,
    label: string,
    title: string,
    onPositiveClick?: (arg?: any) => any,
    setDialogMode: (dialog: IDialogModeElement) => any,
    closeDialog: () => void,
}

export const ChatSettingsDialog = (props: IProps) => {
    const [isEditMode, setEditMode] = useState(false);
    const [fieldValue, setFieldValue] = useState('');
    const dispatch: Dispatch = useDispatch();
    const selectedUserId: number = useSelector(selectUserId);
    const selectedChat: IChat = useSelector(selectSelectedChat);
    const [newChatNameValue, setChatName] = useState('');

    const onCloseDialogClick = useCallback(() => {
        setEditMode(false);
        setFieldValue('');
        props.closeDialog();
    }, [props]);

    const onChangeFieldValue = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(event.target.value);
    }, []);

    const onAddUserToChatDialog = useCallback((fieldValue: string) => {
        if(selectedChat) {
            dispatch(addUserToChat({ login: fieldValue, selectedChatId: selectedChat.id }));
            setFieldValue('');
        }
    }, [dispatch, selectedChat]);

    const onDeleteChatDialog = useCallback(() => {
        dispatch(deleteChat(selectedChat.id));
        dispatch(clearChat());
        props.closeDialog();
    }, [dispatch, props, selectedChat]);

    const onLeaveChat = useCallback((selectedUserId: number, selectedChat: IChat) => {
        dispatch(deleteUserFromChat(selectedUserId, selectedChat.id));
        dispatch(deleteChat(selectedChat.id));
        props.closeDialog();
    }, [dispatch, props]);

    const onEditChatName = useCallback(() => {
        setEditMode(!isEditMode);
    }, [isEditMode]);

    const onChangeChatName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setChatName(event.target.value);
    }, []);

    const onEditOldChatName = useCallback((newChatNameValue: string) => {
       if(selectedChat) {
           setChatName(selectedChat.name);
           dispatch(editOldChatName(newChatNameValue, selectedChat.id));
           setEditMode(!isEditMode);
       }
    }, [dispatch, isEditMode, selectedChat]);

    useEffect(() => {
        if(selectedChat) {
            setChatName(selectedChat.name);
        }
    }, [selectedChat]);

    return (
        <div>
            <Dialog
                open={props.isShow}
                onClose={onCloseDialogClick}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className={styles.chatSettings}>
                    <div className={styles.chatSettingsName}>
                        <DialogTitle id="alert-dialog-title">
                            {selectedChat && `Chat ${selectedChat.name}`}
                        </DialogTitle>
                        {isEditMode ? (
                            <div className={styles.iconsWrapper}>
                                <TextField
                                    value={newChatNameValue}
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label={props.label}
                                    fullWidth
                                    onKeyUp={event => event.key === 'Enter' && onEditOldChatName(newChatNameValue)}
                                    onChange={onChangeChatName}
                                />
                                <IconButton
                                    className={styles.addButton}
                                    disabled={!newChatNameValue}
                                    onClick={() => onEditOldChatName(newChatNameValue)}
                                    color="primary"
                                >
                                    <EditAttributesIcon
                                        fontSize={'large'}
                                    >
                                    </EditAttributesIcon>
                                </IconButton>
                            </div>
                        ) : (
                            <BorderColorIcon
                                className={styles.chatSettingsIcon}
                                onClick={onEditChatName}
                            />
                        )}
                    </div>
                    <div
                        className={styles.chatSettingsIcon}
                        onClick={onCloseDialogClick}
                    >
                        <CloseIcon />
                    </div>
                </div>
                <DialogContent>
                    <DialogContent>
                        <div className={styles.inputWrapper}>
                            <TextField
                                value={fieldValue}
                                autoFocus
                                margin="dense"
                                id="name"
                                label={props.label}
                                fullWidth
                                onKeyUp={event => event.key === 'Enter' && onAddUserToChatDialog(fieldValue)}
                                onChange={onChangeFieldValue}
                            />
                            <Button
                                className={styles.addButton}
                                disabled={!fieldValue}
                                onClick={() => onAddUserToChatDialog(fieldValue)}
                                variant="contained"
                                color="primary"
                                endIcon={<PersonAddIcon>add</PersonAddIcon>}
                            >
                                ADD
                            </Button>
                        </div>
                    </DialogContent>
                    <MembersList />
                </DialogContent>
                <DialogActions className={styles.infoWrapper}>
                </DialogActions>
                {selectedChat && selectedUserId === selectedChat.userOwnerId
                    ? (
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={onDeleteChatDialog}
                        >
                            Delete the chat
                        </Button>
                    )
                    : (
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={() => onLeaveChat(selectedUserId, selectedChat)}
                        >
                            Leave the chat
                        </Button>
                    )
                }
            </Dialog>
        </div>
    );
};

ChatSettingsDialog.defaultProps = {
    contentList: [],
    title: 'Chat Settings',
    positiveBtnText: 'Ok',
    label: '',
    negativeBtnText: 'cancel',
};
