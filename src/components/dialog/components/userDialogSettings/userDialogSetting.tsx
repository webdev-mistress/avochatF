import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {
  useUserDialogSettings,
} from '@/components/dialog/components/userDialogSettings/hook';
import {
  UserDialogContentValue,
} from '@/components/dialog/components/userDialogSettings/userDialogContentValue';
import styles from '../../styles.module.scss';

export const UserSettingsDialog: React.FunctionComponent = () => {
  const {
    isShowUserSettings,
    onCloseDialogClick,
    selectedUser,
  } = useUserDialogSettings();

  return (
    <div>
      <Dialog
        open={isShowUserSettings}
        onClose={onCloseDialogClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={styles.chatSettings}>
          <div className={styles.chatSettingsName}>
            <DialogTitle id="alert-dialog-title">
              {`${selectedUser.name}'s settings`}
            </DialogTitle>
          </div>
          <CloseIcon
            onClick={onCloseDialogClick}
            className={styles.chatSettingsIcon}
          />
        </div>
        <UserDialogContentValue />
        <DialogActions className={styles.infoWrapper}>
        </DialogActions>
      </Dialog>
    </div>
  );
};
