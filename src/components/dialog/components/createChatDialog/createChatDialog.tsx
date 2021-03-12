import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ChatIcon from '@material-ui/icons/Chat';
import {
  useCreateChatDialog,
} from '@/components/dialog/components/createChatDialog/hook';
import styles from '../../styles.module.scss';

export const CreateChatDialog: React.FunctionComponent = () => {
  const {
    chatName,
    onChangeFieldValue,
    onCloseDialog,
    onCreateChat,
    isShowDialog,
    onKeyUpEnter,
  } = useCreateChatDialog();

  return (
    <div>
      <Dialog
        open={isShowDialog}
        onClose={onCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={styles.chatSettings}>
          <div className={styles.chatSettingsName}>
            <DialogTitle id="alert-dialog-title">
              Create Chat
            </DialogTitle>
            <div className={styles.iconsWrapper}>
              <IconButton
                className={styles.addButton}
                disabled={isShowDialog}
                color="primary"
              >
              </IconButton>
            </div>
          </div>
          <div
            className={styles.chatSettingsIcon}
            onClick={onCloseDialog}
          >
            <CloseIcon />
          </div>
        </div>
        <DialogContent>
          <DialogContent>
            <div className={styles.inputWrapper}>
              <TextField
                value={chatName}
                autoFocus
                margin="dense"
                id="createChat"
                fullWidth
                onKeyUp={onKeyUpEnter}
                onChange={onChangeFieldValue()}
              />
              <Button
                className={styles.addButton}
                disabled={!chatName}
                onClick={onCreateChat(chatName)}
                variant="contained"
                color="primary"
                endIcon={<ChatIcon>Create</ChatIcon>}
              >
                Create
              </Button>
            </div>
          </DialogContent>
        </DialogContent>
        <DialogActions className={styles.infoWrapper}>
        </DialogActions>
      </Dialog>
    </div>
  );
};
