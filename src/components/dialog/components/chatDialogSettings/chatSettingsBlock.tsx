import React from 'react';
import styles from '@/components/dialog/styles.module.scss';
import { DialogTitle, TextField } from '@material-ui/core';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import CloseIcon from '@material-ui/icons/Close';
import {
  useChatDialogSettings,
} from '@/components/dialog/components/chatDialogSettings/hook';
import { IconButtonWithLoader } from '@/components/ui/iconButtonWithLoader';

export const ChatSettingsBlock = (): any => {
  const {
    isEditMode,
    selectedChatName,
    newChatNameValue,
    onCloseDialogClick,
    onEditChatName,
    onChangeChatName,
    onEditOldChatName,
    onKeyUpEditChatEnter,
    isEditChatNameLoading,
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
            <IconButtonWithLoader
              className={styles.addButton}
              disabled={!newChatNameValue}
              isLoading={isEditChatNameLoading}
              onClick={onEditOldChatName(newChatNameValue)}
              color="primary"
            >
              {!isEditChatNameLoading && (
                <EditAttributesIcon
                  fontSize={'large'}
                >
                </EditAttributesIcon>
              )}
            </IconButtonWithLoader>
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
