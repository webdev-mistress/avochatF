import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
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
import { selectUser } from '@/redux/store/user/selectors';
import { editOldUser } from '@/redux/store/user/actions';
import { setIsShowUserSettings } from '@/redux/store/ui/actions';
import { selectIsShowUserSettings } from '@/redux/store/ui/selectors';
import { IChangedFields } from '@/types/store/chatActions';
import { IUser } from '@/types/store/userActions';
import styles from '../../styles.module.scss';

interface IEditMode {
    isEditName: boolean,
    isEditLogin: boolean,
    isEditPassword: boolean,
}

interface IUserValue {
    userName: string,
    userLogin: string,
    oldPassword: string,
    newPassword1: string,
    newPassword2: string,
    password?: string,
}

type userTypeFields = 'newName' | 'newLogin' | 'password'
  | 'password1' | 'password2';

type userFields = 'userName' | 'userLogin' | 'password';

export const UserSettingsDialog: React.FunctionComponent = () => {
  const dispatch: Dispatch = useDispatch();
  const selectedUser: IUser = useSelector(selectUser);
  const isShowUserSettings = useSelector(selectIsShowUserSettings);
  const [isUserEditMode, setUserEditMode] = useState<IEditMode>(
    { isEditName: false, isEditLogin: false, isEditPassword: false });
  const [userValue, setUserValue] = useState<IUserValue>({
    userName: selectedUser.name,
    userLogin: selectedUser.login,
    oldPassword: '',
    newPassword1: '',
    newPassword2: '',
  });

  const onCloseDialogClick = useCallback(() => {
    setUserEditMode({ isEditLogin: false, isEditName: false, isEditPassword: false });
    setUserValue({
      ...userValue,
      userName: selectedUser.name,
      userLogin: selectedUser.login,
    });
    dispatch(setIsShowUserSettings(false));
  }, [dispatch, selectedUser.login, selectedUser.name, userValue]);

  const onEditUser = useCallback((editType: string) => () => {
    setUserEditMode((prev) => ({ ...prev, [editType]: true }));
  }, []);

  const onChangeUser = useCallback((changeType: string) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    setUserValue((prev) => ({ ...prev, [changeType]: value }));
  }, []);

  const onEditUserEnter = useCallback(
    (editValue: userTypeFields, userField: userFields) => (
      event: React.KeyboardEvent) => {
      if(event.key === 'Enter' && editValue === 'password') {
        const changedFields: IChangedFields = {
          userId: selectedUser.id,
          oldPassword: userValue.oldPassword,
          newPassword1: userValue.newPassword1,
          newPassword2: userValue.newPassword2,
        };
        dispatch(editOldUser(changedFields));
        setUserEditMode((prev) => ({ ...prev, isEditPassword: false }));
      } else if(event.key === 'Enter') {
        const changedFields: IChangedFields = {
          userId: selectedUser.id,

          [editValue]: userValue[userField],
        };
        dispatch(editOldUser(changedFields));
        setUserEditMode((prev) => (
          { ...prev, isEditLogin: false, isEditName: false }
        ));
      }
    }, [dispatch, selectedUser.id, userValue]);

  const onEditOldUser = useCallback((
    editValue: userTypeFields, userField: userFields,
  ) => () => {
    if(editValue === 'password') {
      const changedFields: IChangedFields = {
        userId: selectedUser.id,
        oldPassword: userValue.oldPassword,
        newPassword1: userValue.newPassword1,
        newPassword2: userValue.newPassword2,
      };
      dispatch(editOldUser(changedFields));
      setUserEditMode((prev) => ({ ...prev, isEditPassword: false }));
    } else {
      const changedFields: IChangedFields = {
        userId: selectedUser.id,
        [editValue]: userValue[userField],
      };
      dispatch(editOldUser(changedFields));
      setUserEditMode((prev) => (
        { ...prev, isEditLogin: false, isEditName: false }
      ));
    }
  }, [dispatch, selectedUser.id, userValue]);

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
                    onClick={onEditOldUser('newName', 'userName')}
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
                    onClick={onEditOldUser('newLogin', 'userLogin')}
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
                    onClick={onEditOldUser('password', 'password')}
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
