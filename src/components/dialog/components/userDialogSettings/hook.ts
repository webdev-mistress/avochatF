import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { selectUser } from '@/redux/store/user/selectors';
import { selectIsShowUserSettings } from '@/redux/store/ui/selectors';
import { setIsShowUserSettings } from '@/redux/store/ui/actions';
import { editCurrentUserRequest } from '@/redux/store/user/actions';
import { IChangedFields } from '@/types/store/chatActions';
import { IUser } from '@/types/store/userActions';

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

export const useUserDialogSettings = (): any => {
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
        dispatch(editCurrentUserRequest(changedFields));
        setUserEditMode((prev) => ({ ...prev, isEditPassword: false }));
      } else if(event.key === 'Enter') {
        const changedFields: IChangedFields = {
          userId: selectedUser.id,

          [editValue]: userValue[userField],
        };
        dispatch(editCurrentUserRequest(changedFields));
        setUserEditMode((prev) => (
          { ...prev, isEditLogin: false, isEditName: false }
        ));
      }
    }, [dispatch, selectedUser.id, userValue]);

  const onEditCurrentUser = useCallback((
    editValue: userTypeFields, userField: userFields,
  ) => () => {
    if(editValue === 'password') {
      const changedFields: IChangedFields = {
        userId: selectedUser.id,
        oldPassword: userValue.oldPassword,
        newPassword1: userValue.newPassword1,
        newPassword2: userValue.newPassword2,
      };
      dispatch(editCurrentUserRequest(changedFields));
      setUserEditMode((prev) => ({ ...prev, isEditPassword: false }));
    } else {
      const changedFields: IChangedFields = {
        userId: selectedUser.id,
        [editValue]: userValue[userField],
      };
      dispatch(editCurrentUserRequest(changedFields));
      setUserEditMode((prev) => (
        { ...prev, isEditLogin: false, isEditName: false }
      ));
    }
  }, [dispatch, selectedUser.id, userValue]);
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
