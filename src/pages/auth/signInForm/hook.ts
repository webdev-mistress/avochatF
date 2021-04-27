import { ChangeEvent, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {
  Auth,
  signInRequest,
} from '@/redux/store/user/actions';
import { selectLoaderStatus } from '@/redux/store/ui/selectors';

export const useSignInForm = (): any => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const isSignInLoading = useSelector(selectLoaderStatus(Auth.SIGN_IN));
  const dispatch: Dispatch = useDispatch();

  // useEffect(() => {
  //   if (errorMessage) {
  //     setPassword('');
  //   }
  // }, [errorMessage]);

  const onSignIn = useCallback((event) => {
    event.preventDefault();
    if (!login || !password) {
      return;
    }
    dispatch(signInRequest({ login, password }));
  }, [dispatch, login, password]);

  const onSignInEnter = useCallback((event) => {
    if (event.key === 'Enter') {
      onSignIn(event);
    }
  }, [onSignIn]);

  const onChange = useCallback((name, setState) => (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setState(name === 'login' ? value.trim() : value);

    // if (errorMessage) {
    //   dispatch(removeAuthErrorMessage());
    // }
  }, []);

  return {
    login,
    setLogin,
    password,
    setPassword,
    isSignInLoading,
    onSignInEnter,
    onChange,
    onSignIn,
  };
};
