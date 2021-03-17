import React from 'react';
import { DialogContent, DialogTitle, TextField } from '@material-ui/core';
import styles from '@/components/dialog/styles.module.scss';
import IconButton from '@material-ui/core/IconButton';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import {
  useUserDialogSettings,
} from '@/components/dialog/components/userDialogSettings/hook';
import {
  UserDialogContentPassword,
} from '@/components/dialog/components/userDialogSettings/userDialogContentPassword';

export const UserDialogContentValue = (): any => {
  const {
    isUserEditMode,
    userValue,
    onEditUser,
    onChangeUser,
    onEditUserEnter,
    onEditCurrentUser,
    selectedUser,
  } = useUserDialogSettings();
  return (
    <DialogContent>
      <div className={styles.userSettingsWrapper}>
        <DialogTitle>
          { `Email: ${selectedUser.email}` }
        </DialogTitle>
        {isUserEditMode.isEditEmail ? (
          <div className={styles.iconsWrapper}>
            <TextField
              value={userValue.email}
              autoFocus
              margin="dense"
              id="email"
              fullWidth
              onKeyUp={onEditUserEnter('email')}
              onChange={onChangeUser('email')}
            />
            <IconButton
              className={styles.addButton}
              disabled={!userValue.email}
              onClick={onEditCurrentUser('email')}
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
            onClick={onEditUser('isEditEmail')}
          />
        )}
      </div>
      <div className={styles.userSettingsWrapper}>
        <DialogTitle>
          { `Name: ${selectedUser.name}` }
        </DialogTitle>
        {isUserEditMode.isEditName ? (
          <div className={styles.iconsWrapper}>
            <TextField
              value={userValue.name}
              autoFocus
              margin="dense"
              id="name"
              fullWidth
              onKeyUp={onEditUserEnter('name')}
              onChange={onChangeUser('name')}
            />
            <IconButton
              className={styles.addButton}
              disabled={!userValue.name}
              onClick={onEditCurrentUser('name')}
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
            onClick={onEditUser('isEditName')}
          />
        )}
      </div>
      <div className={styles.userSettingsWrapper}>
        <DialogTitle>
          { `Login: ${selectedUser.login}` }
        </DialogTitle>
        {isUserEditMode.isEditLogin ? (
          <div className={styles.iconsWrapper}>
            <TextField
              value={userValue.login}
              autoFocus
              margin="dense"
              id="login"
              fullWidth
              onKeyUp={onEditUserEnter('login')}
              onChange={onChangeUser('login')}
            />
            <IconButton
              className={styles.addButton}
              disabled={!userValue.login}
              onClick={onEditCurrentUser('login')}
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
            onClick={onEditUser('isEditLogin')}
          />
        )}
      </div>
      <div className={styles.userSettingsWrapper}>
        <DialogTitle>
        </DialogTitle>
        {isUserEditMode.isEditPassword
          ? (
            <UserDialogContentPassword />
          )
          : (
            <Button
              variant="outlined"
              className={styles.addButton}
              onClick={onEditUser('isEditPassword')}
              color="primary"
              endIcon={<EditIcon fontSize={'large'}> </EditIcon>}
            >
              Change password
            </Button>
          )}
      </div>
    </DialogContent>
  );
};
