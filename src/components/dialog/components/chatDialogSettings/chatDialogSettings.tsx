import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
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
import { ButtonWithLoader } from '@/components/ui/buttonWithLoader';

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
    isDeleteChatLoading,
    isDeleteUserFromChatLoading,
    isAddUserToChatLoading,
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
              <ButtonWithLoader
                className={styles.addButton}
                text={'ADD'}
                isLoading={isAddUserToChatLoading}
                disabled={!fieldValue}
                onClick={onAddUserToChatDialog(fieldValue)}
                variant="contained"
                color="primary"
                endIcon={!isAddUserToChatLoading && (<PersonAddIcon>add</PersonAddIcon>)}
              />
            </div>
          </DialogContent>
          <MembersList />
        </DialogContent>
        <DialogActions className={styles.infoWrapper}>
        </DialogActions>
        {selectedUserId === selectedUserOwnerId
          ? (
            <ButtonWithLoader
              color="secondary"
              variant="contained"
              isLoading={isDeleteChatLoading}
              text={'Delete the chat'}
              onClick={onDeleteChatDialog}
            />
          )
          : (
            <ButtonWithLoader
              color="secondary"
              variant="contained"
              text={'Leave the chat'}
              isLoading={isDeleteUserFromChatLoading}
              onClick={onLeaveChat}
            />
          )
        }
      </Dialog>
    </div>
  );
};
