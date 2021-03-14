import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { selectErrorMessage, selectIsAuthSpin } from '@/redux/store/user/selectors';
import { removeErrorMessage, signInUserRequest } from '@/redux/store/user/actions';

export const useAuthForm = (): any => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const errorMessage = useSelector(selectErrorMessage);
  const isAuthSpin = useSelector(selectIsAuthSpin);
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    if (errorMessage) {
      setPassword('');
    }
  }, [errorMessage]);

  const onAuth = useCallback((event) => {
    event.preventDefault();
    if (!login || !password) {
      return;
    }
    dispatch(signInUserRequest({ login, password }));
  }, [dispatch, login, password]);

  const onAuthEnter = useCallback((event) => {
    if (event.key === 'Enter') {
      onAuth(event);
    }
  }, [onAuth]);

  const onChange = useCallback((name, setState) => (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setState(name === 'login' ? value.trim() : value);

    if (errorMessage) {
      dispatch(removeErrorMessage());
    }
  }, [dispatch, errorMessage]);

  return {
    login,
    setLogin,
    password,
    setPassword,
    errorMessage,
    isAuthSpin,
    onAuthEnter,
    onChange,
    onAuth,
  };
};
