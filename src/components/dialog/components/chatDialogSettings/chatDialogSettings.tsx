import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import IconButton from '@material-ui/core/IconButton';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import { MembersList } from '@/components/dialog/components/memberList';
import { useChatDialogSettings } from '@/components/dialog/components/chatDialogSettings/hook';
import styles from '../../styles.module.scss';

interface IProps {
    isShow: boolean,
    onClose: () => any,
    label: string,
    closeDialog: () => void,
}

export const ChatSettingsDialog = (props: IProps) => {
    const { closeDialog, isShow, label } = props;
    const {
        isEditMode,
        fieldValue,
        selectedUserId,
        selectedChat,
        newChatNameValue,
        onCloseDialogClick,
        onChangeFieldValue,
        onAddUserToChatDialog,
        onDeleteChatDialog,
        onLeaveChat,
        onEditChatName,
        onChangeChatName,
        onEditOldChatName,
    } = useChatDialogSettings({ closeDialog });

    return (
        <div>
            <Dialog
                open={isShow}
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
                                    // label={label}
                                    fullWidth
                                    onKeyUp={event => event.key === 'Enter' && onEditOldChatName(newChatNameValue)}
                                    onChange={onChangeChatName}
                                />
                                <IconButton
                                    className={styles.addButton}
                                    disabled={!newChatNameValue}
                                    onClick={onEditOldChatName(newChatNameValue)}
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
                                label={label}
                                fullWidth
                                onKeyUp={event => event.key === 'Enter' && onAddUserToChatDialog(fieldValue)}
                                onChange={onChangeFieldValue}
                            />
                            <Button
                                className={styles.addButton}
                                disabled={!fieldValue}
                                onClick={onAddUserToChatDialog(fieldValue)}
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
                            onClick={onLeaveChat(selectedUserId, selectedChat)}
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
