import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { selectUser } from '@/redux/store/user/selectors';
import { selectIsShowUserSettings } from '@/redux/store/ui/selectors';
import { setIsShowUserSettings } from '@/redux/store/ui/actions';
import { editCurrentUserRequest } from '@/redux/store/user/actions';
import { IUser } from '@/types/store/userActions';

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
  newPassword1: string,
  newPassword2: string,
  password?: string,
}

type EditUserField = keyof IEditUserFields;

type PasswordField = keyof IEditPasswordFields;

// type userTypeFields = 'newName' | 'newLogin' | 'password'
//   | 'password1' | 'password2';
//
// type userFields = 'userName' | 'userLogin' | 'password';

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
    dispatch(setIsShowUserSettings(false));
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
  };
};
