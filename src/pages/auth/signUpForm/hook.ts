import React, { ChangeEvent, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Auth, signUpRequest } from '@/redux/store/user/actions';
import { ButtonEvent } from '@/types/components';
import {
  selectIsRegFinished,
  selectLoaderStatus,
} from '@/redux/store/ui/selectors';

export const useSignUpForm = (): any => {
  const initialState = {
    email: '',
    name: '',
    login: '',
    password1: '',
    password2: '',
    disabledButton: false,
    errorText: '',
  };
  const [state, setState] = useState(initialState);
  const {
    email,
    name,
    login,
    password1,
    password2,
    disabledButton,
  } = state;
  const isSignUpLoading = useSelector(selectLoaderStatus(Auth.SIGN_UP));
  const isRegFinished = useSelector(selectIsRegFinished);
  const dispatch = useDispatch();

  const onCreateUser = useCallback((
    event: React.KeyboardEvent<HTMLDivElement> | ButtonEvent,
  ) => {
    event.preventDefault();

    if (disabledButton) {
      return;
    }
    if (password1 !== password2) {
      setState((prev) => ({
        ...prev,
        errorText: 'Passwords are not equal!',
      }));

      return;
    }
    setState({ ...state, disabledButton: true });
    dispatch(signUpRequest({ email, name, login, password: password1 }));
  }, [disabledButton, dispatch, email, login, name, password1, password2, state]);

  const onKeyUpEnter = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && isRegFinished) {
      onCreateUser(event);
    }
  }, [isRegFinished, onCreateUser]);

  const onChange = useCallback((name) => (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    // if (errorMessage) {
    //   dispatch(removeAuthErrorMessage());
    // }
    const { value } = event.target;
    setState({
      ...state,
      [name]: name === 'login'
      || name === 'name'
      || name === 'email' ? value.trim() : value,
      disabledButton: false,
      errorText: '',
    });
  }, [state]);

  const disabledRegFormButton = !name
    || !login
    || !password1
    || !password2
    || state.disabledButton;

  return {
    isSignUpLoading,
    onKeyUpEnter,
    onCreateUser,
    onChange,
    disabledRegFormButton,
    login,
    password1,
    password2,
    name,
    email,
    state,
    isRegFinished,
  };
};
