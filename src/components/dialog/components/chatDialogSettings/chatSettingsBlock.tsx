import React from 'react';
import styles from '@/components/dialog/styles.module.scss';
import { DialogTitle, TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import CloseIcon from '@material-ui/icons/Close';
import {
  useChatDialogSettings,
} from '@/components/dialog/components/chatDialogSettings/hook';

export const ChatSettingsBlock = (): any => {
  const {
    isEditMode,
    // selectedChatId,
    selectedChatName,
    newChatNameValue,
    onCloseDialogClick,
    onEditChatName,
    onChangeChatName,
    onEditOldChatName,
    onKeyUpEditChatEnter,
  } = useChatDialogSettings();
  return (
    <div className={styles.chatSettings}>
      <div className={styles.chatSettingsName}>
        <DialogTitle id="alert-dialog-title">
          {`Chat ${selectedChatName}`}
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
  );
};
