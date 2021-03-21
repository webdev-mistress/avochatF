import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { selectUser } from '@/redux/store/user/selectors';
import { selectIsShowUserSettings } from '@/redux/store/ui/selectors';
import {
  changePasswordRequest,
  editCurrentUserRequest,
} from '@/redux/store/user/actions';
import { setShowUserSettings } from '@/redux/store/ui/actions';
import { IUser } from '@/types/store/userActions';
import { IChangePasswordData } from '@/types/store/authActions';

interface IEditMode {
  isEditName: boolean,
  isEditLogin: boolean,
  isEditEmail: boolean,
  isEditPassword: boolean,
}

interface IEditUserFields {
  email: string,
  name: string,
  login: string,
  lang?: string,
}

interface IEditPasswordFields {
  oldPassword: string,
  password1: string,
  password2: string,
}

type EditUserField = keyof IEditUserFields;

type PasswordField = keyof IEditPasswordFields;

export const useUserDialogSettings = (): any => {
  const dispatch: Dispatch = useDispatch();
  const selectedUser: IUser = useSelector(selectUser);
  const isShowUserSettings = useSelector(selectIsShowUserSettings);
  const [isUserEditMode, setUserEditMode] = useState<IEditMode>({
    isEditName: false,
    isEditLogin: false,
    isEditEmail: false,
    isEditPassword: false,
  });
  const [userValue, setUserValue] = useState<IEditUserFields>({
    email: selectedUser.email,
    name: selectedUser.name,
    login: selectedUser.login,
  });
  const [passwordValue, setPasswordValue] = useState<IEditPasswordFields>({
    oldPassword: '',
    password1: '',
    password2: '',
  });

  const onCloseDialogClick = useCallback(() => {
    setUserEditMode({
      isEditLogin: false,
      isEditName: false,
      isEditEmail: false,
      isEditPassword: false });
    setUserValue({
      ...userValue,
      name: selectedUser.name,
      login: selectedUser.login,
      email: selectedUser.email,
    });
    dispatch(setShowUserSettings({ isActive: false }));
  }, [dispatch, selectedUser.email, selectedUser.login, selectedUser.name, userValue]);

  const onEditUser = useCallback((editType: string) => () => {
    setUserEditMode((prev) => ({ ...prev, [editType]: true }));
  }, []);

  const onChangeUser = useCallback((changeType: string) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    setUserValue((prev) => ({ ...prev, [changeType]: value }));
  }, []);

  const onEditUserEnter = useCallback(
    (editField: EditUserField) => (event: React.KeyboardEvent) => {
      if(event.key === 'Enter') {
        dispatch(editCurrentUserRequest({ [editField]: userValue[editField] }));
        setUserEditMode((prev) => (
          { ...prev, isEditLogin: false, isEditName: false, isEditEmail: false }
        ));
      }
    }, [dispatch, userValue]);

  const onEditCurrentUser = useCallback((editField: EditUserField) => () => {
    dispatch(editCurrentUserRequest({ [editField]: userValue[editField] }));
    setUserEditMode((prev) => (
      { ...prev, isEditLogin: false, isEditName: false, isEditEmail: false }
    ));
  }, [dispatch, userValue]);

  const onChangePassword = useCallback((changeType: PasswordField) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = event.target;
    setPasswordValue((prev) => ({ ...prev, [changeType]: value }));
  }, []);

  const onEditPassword = useCallback(() => {
    if(passwordValue.password1 !== passwordValue.password2) {
      return;
    }
    const passwordData: IChangePasswordData = {
      oldPassword: passwordValue.oldPassword,
      newPassword: passwordValue.password1,
    };
    dispatch(changePasswordRequest(passwordData));
    setUserEditMode((prev) => (
      { ...prev, isEditPassword: false }
    ));
  }, [
    dispatch, passwordValue.oldPassword, passwordValue.password1, passwordValue.password2,
  ]);

  return {
    isShowUserSettings,
    isUserEditMode,
    userValue,
    onCloseDialogClick,
    onEditUser,
    onChangeUser,
    onEditUserEnter,
    onEditCurrentUser,
    selectedUser,
    onChangePassword,
    passwordValue,
    onEditPassword,
  };
};
