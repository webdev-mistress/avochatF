import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { Container } from '@material-ui/core';
import { selectErrorMessage } from '@/redux/store/user/selectors';
import { removeAuthErrorMessage } from '@/redux/store/user/actions';
import { AuthForm } from './authForm';
import { RegForm } from './regForm';
import style from './styles.module.scss';

export const AuthPage: React.FunctionComponent = () => {
  const [isAuthForm, setIsAuthForm] = useState(true);
  const errorMessage = useSelector(selectErrorMessage);
  const dispatch: Dispatch = useDispatch();

  const onToggleForm = useCallback((isAuthForm: boolean) => () => {
    if (errorMessage) {
      dispatch(removeAuthErrorMessage());
    }

    setIsAuthForm(isAuthForm);
  }, [dispatch, errorMessage]);

  return (
    <Container maxWidth="sm" className={style.wrapper}>
      {isAuthForm
        ? <AuthForm onOpenRegForm={onToggleForm} />
        : <RegForm onOpenAuthForm={onToggleForm} />}
    </Container>
  );
};
