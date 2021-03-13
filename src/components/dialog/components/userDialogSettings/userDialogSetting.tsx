import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import IconButton from '@material-ui/core/IconButton';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import {
  useUserDialogSettings,
} from '@/components/dialog/components/userDialogSettings/hook';
import styles from '../../styles.module.scss';

export const UserSettingsDialog: React.FunctionComponent = () => {
  const {
    isShowUserSettings,
    isUserEditMode,
    userValue,
    onCloseDialogClick,
    onEditUser,
    onChangeUser,
    onEditUserEnter,
    onEditCurrentUser,
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
        <DialogContent>
          <DialogContent>
            <div className={styles.userSettingsWrapper}>
              <DialogTitle>
                { `Name: ${selectedUser.name}` }
              </DialogTitle>
              {isUserEditMode.isEditName ? (
                <div className={styles.iconsWrapper}>
                  <TextField
                    value={userValue.userName}
                    autoFocus
                    margin="dense"
                    id="name"
                    fullWidth
                    onKeyUp={onEditUserEnter(
                      'newName', 'userName')}
                    onChange={onChangeUser('userName')}
                  />
                  <IconButton
                    className={styles.addButton}
                    disabled={!userValue.userName}
                    onClick={onEditCurrentUser('newName', 'userName')}
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
                    value={userValue.userLogin}
                    autoFocus
                    margin="dense"
                    id="login"
                    fullWidth
                    onKeyUp={onEditUserEnter('newLogin', 'userLogin')}
                    onChange={onChangeUser('userLogin')}
                  />
                  <IconButton
                    className={styles.addButton}
                    disabled={!userValue.userLogin}
                    onClick={onEditCurrentUser('newLogin', 'userLogin')}
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
              {isUserEditMode.isEditPassword ? (
                <div>
                  <div className={styles.iconsWrapper}>
                    <TextField
                      placeholder={'old password'}
                      value={userValue.oldPassword}
                      autoFocus
                      margin="dense"
                      id="name"
                      fullWidth
                      onChange={onChangeUser('oldPassword')}
                    />
                  </div>
                  <div className={styles.iconsWrapper}>
                    <TextField
                      placeholder={'new password'}
                      value={userValue.newPassword1}
                      margin="dense"
                      id="name"
                      fullWidth
                      onChange={onChangeUser('newPassword1')}
                    />
                  </div>
                  <div className={styles.iconsWrapper}>
                    <TextField
                      placeholder={'new password again'}
                      value={userValue.newPassword2}
                      margin="dense"
                      id="name"
                      fullWidth
                      onChange={onChangeUser('newPassword2')}
                    />
                  </div>
                  <Button
                    variant="contained"
                    className={styles.addButton}
                    disabled={
                      !userValue.oldPassword
                      || !userValue.newPassword1
                      || !userValue.newPassword2
                    }
                    onClick={onEditCurrentUser('password', 'password')}
                    color="primary"
                    endIcon={<EditAttributesIcon fontSize={'large'} />}
                  >
                    Change password
                  </Button>
                </div>
              ) : (
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
        </DialogContent>
        <DialogActions className={styles.infoWrapper}>
        </DialogActions>
      </Dialog>
    </div>
  );
};
