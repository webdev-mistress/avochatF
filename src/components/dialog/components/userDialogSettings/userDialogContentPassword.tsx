import React from 'react';
import styles from '@/components/dialog/styles.module.scss';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import {
  useUserDialogSettings,
} from '@/components/dialog/components/userDialogSettings/hook';

export const UserDialogContentPassword = (): any => {
  const {
    passwordValue,
    onEditPassword,
    onChangePassword,
  } = useUserDialogSettings();

  return (
    <div>
      <div className={styles.iconsWrapper}>
        <TextField
          type={'password'}
          placeholder={'old password'}
          value={passwordValue.oldPassword}
          autoFocus
          margin="dense"
          id="name"
          fullWidth
          onChange={onChangePassword('oldPassword')}
        />
      </div>
      <div className={styles.iconsWrapper}>
        <TextField
          type={'password'}
          placeholder={'new password'}
          value={passwordValue.password1}
          margin="dense"
          id="name"
          fullWidth
          onChange={onChangePassword('password1')}
        />
      </div>
      <div className={styles.iconsWrapper}>
        <TextField
          type={'password'}
          placeholder={'new password again'}
          value={passwordValue.password2}
          margin="dense"
          id="name"
          fullWidth
          onChange={onChangePassword('password2')}
        />
      </div>
      <Button
        variant="contained"
        className={styles.addButton}
        disabled={
          !passwordValue.oldPassword
          || !passwordValue.password1
          || !passwordValue.password2
        }
        onClick={onEditPassword}
        color="primary"
        endIcon={<EditAttributesIcon fontSize={'large'} />}
      >
        Change password
      </Button>
    </div>
  );
};
