import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {
  MembersList,
} from '@/components/dialog/components/chatDialogSettings/memberList';
import {
  useChatDialogSettings,
} from '@/components/dialog/components/chatDialogSettings/hook';
import {
  ChatSettingsBlock,
} from '@/components/dialog/components/chatDialogSettings/chatSettingsBlock';
import styles from '../../styles.module.scss';

export const ChatSettingsDialog: React.FunctionComponent = () => {
  const {
    fieldValue,
    selectedUserId,
    selectedUserOwnerId,
    onCloseDialogClick,
    onChangeFieldValue,
    onAddUserToChatDialog,
    onDeleteChatDialog,
    onLeaveChat,
    isShowChatSettings,
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
        <ChatSettingsBlock />
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
        {selectedUserId === selectedUserOwnerId
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
