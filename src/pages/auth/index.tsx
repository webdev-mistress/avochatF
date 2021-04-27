import React, { useCallback, useState } from 'react';
import { Container } from '@material-ui/core';
import style from './styles.module.scss';
import { SignInForm } from '@/pages/auth/signInForm';
import { SignUpForm } from '@/pages/auth/signUpForm';

export const AuthPage: React.FunctionComponent = () => {
  const [isAuthForm, setIsAuthForm] = useState(true);

  const onToggleForm = useCallback((isAuthForm: boolean) => () => {
    setIsAuthForm(isAuthForm);
  }, []);

  return (
    <Container maxWidth="sm" className={style.wrapper}>
      {isAuthForm
        ? <SignInForm onOpenSignUpForm={onToggleForm} />
        : <SignUpForm onOpenSignInForm={onToggleForm} />}
    </Container>
  );
};
