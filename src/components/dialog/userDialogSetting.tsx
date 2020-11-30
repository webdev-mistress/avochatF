// eslint-disable-next-line no-unused-vars
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import IconButton from '@material-ui/core/IconButton';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { selectUser } from '@/redux/store/user/selectors';
import { editOldUser } from '@/redux/store/user/actions';
import { IDialogModeElement } from '@/types/components';
import { IChangedFields, IUser } from '@/types/store';
import styles from './styles.module.scss';

interface IProps {
    isShow: boolean,
    onClose: () => any,
    positiveBtnText: string,
    negativeBtnText: string,
    label: string,
    title: string,
    onPositiveClick?: (arg?: any) => any,
    setDialogMode: (dialog: IDialogModeElement) => any,
    closeDialog: () => void,
}

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
}

type userTypeFields = 'newName' | 'newLogin' | 'password';

type userFields = 'userName' | 'userLogin' | 'password';

export const UserSettingsDialog = (props: IProps) => {
    const dispatch: Dispatch = useDispatch();
    const selectedUser: IUser = useSelector(selectUser);
    const [isUserEditMode, setUserEditMode] = useState<IEditMode>(
        { isEditName: false, isEditLogin: false, isEditPassword: false });
    const [userValue, setUserValue] = useState<IUserValue>({
        userName: selectedUser.name, userLogin: selectedUser.login, oldPassword: '', newPassword1: '', newPassword2: '',
    });

    const onCloseDialogClick = useCallback(() => {
        setUserEditMode({ isEditLogin: false, isEditName: false, isEditPassword: false });
        setUserValue({ ...userValue, userName: selectedUser.name, userLogin: selectedUser.login });
        props.closeDialog();
    }, [props, selectedUser.login, selectedUser.name, userValue]);

    const onEditUser = useCallback((editType: string) => () => {
        setUserEditMode((prev) => ({ ...prev, [editType]: true }));
    }, []);

    const onChangeUser = useCallback((changeType: string) => (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = event.target;
        setUserValue((prev) => ({ ...prev, [changeType]: value }));
    }, []);

    const onEditUserEnter = useCallback((editValue: userTypeFields, userField: userFields) => (
        event: React.KeyboardEvent) => {
        if(event.key === 'Enter' && editValue === 'password') {
            const changedFields: IChangedFields = {
                userId: selectedUser.userId,
                oldPassword: userValue.oldPassword,
                newPassword1: userValue.newPassword1,
                newPassword2: userValue.newPassword2,
            };
            dispatch(editOldUser(changedFields));
            setUserEditMode((prev) => ({ ...prev, isEditPassword: false }));
        } else if(event.key === 'Enter') {
            const changedFields: IChangedFields = {
                userId: selectedUser.userId,
                // @ts-ignore
                [editValue]: userValue[userField],
            };
            dispatch(editOldUser(changedFields));
            setUserEditMode((prev) => ({ ...prev, isEditLogin: false, isEditName: false }));
        }
    }, [dispatch, selectedUser.userId, userValue]);

    const onEditOldUser = useCallback((editValue: userTypeFields, userField: userFields) => () => {
        if(editValue === 'password') {
            const changedFields: IChangedFields = {
                userId: selectedUser.userId,
                oldPassword: userValue.oldPassword,
                newPassword1: userValue.newPassword1,
                newPassword2: userValue.newPassword2,
            };
            dispatch(editOldUser(changedFields));
            setUserEditMode((prev) => ({ ...prev, isEditPassword: false }));
        } else {
            const changedFields: IChangedFields = {
                userId: selectedUser.userId,
                // @ts-ignore
                [editValue]: userValue[userField],
            };
            dispatch(editOldUser(changedFields));
            setUserEditMode((prev) => ({ ...prev, isEditLogin: false, isEditName: false }));
        }
    }, [dispatch, selectedUser.userId, userValue]);

    return (
        <div>
            <Dialog
                open={props.isShow}
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
                                        label={props.label}
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
                                        label={props.label}
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
                                            label={props.label}
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
                                            label={props.label}
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
                                            label={props.label}
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
                                        endIcon={<EditAttributesIcon fontSize={'large'}> </EditAttributesIcon>}
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

UserSettingsDialog.defaultProps = {
    contentList: [],
    title: 'Chat Settings',
    positiveBtnText: 'Ok',
    label: '',
    negativeBtnText: 'cancel',
};
