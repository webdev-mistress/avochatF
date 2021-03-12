import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import IconButton from '@material-ui/core/IconButton';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import {
  MembersList,
} from '@/components/dialog/components/chatDialogSettings/memberList';
import {
  useChatDialogSettings,
} from '@/components/dialog/components/chatDialogSettings/hook';
import styles from '../../styles.module.scss';

export const ChatSettingsDialog: React.FunctionComponent = () => {
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
    isShowChatSettings,
    onKeyUpEditChatEnter,
    onKeyUpAddUser,
  } = useChatDialogSettings();

  return (
    <div>
      <Dialog
        open={isShowChatSettings}
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
                  fullWidth
                  onKeyUp={onKeyUpEditChatEnter}
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
                fullWidth
                onKeyUp={onKeyUpAddUser}
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
              onClick={onLeaveChat}
            >
              Leave the chat
            </Button>
          )
        }
      </Dialog>
    </div>
  );
};
