import React from 'react';
import {
  TextField,
  Typography,
  Card,
  CardContent,
  Button,
} from '@material-ui/core';
import { useSignInForm } from '@/pages/auth/signInForm/hook';
import styles from './styles.module.scss';
import { ButtonWithLoader } from '@/components/ui/buttonWithLoader';

interface IProps {
  onOpenSignUpForm: (isAuth: boolean) => any;
}

export const SignInForm: React.FunctionComponent<IProps> = ({ onOpenSignUpForm }) => {
  const {
    login,
    setLogin,
    password,
    setPassword,
    errorMessage,
    isSignInLoading,
    onSignInEnter,
    onChange,
    onSignIn,
  } = useSignInForm();

  return (
    <Card className={styles.card}>
      <CardContent className={styles.cardContent}>
        <Typography variant="h4">Authorization</Typography>
        <div className={styles.errorMessage}>{errorMessage}</div>
        <form className={styles.form}>
          <TextField
            required
            value={login}
            id="authLogin"
            label="Login"
            onChange={onChange('login', setLogin)}
            onKeyUp={onSignInEnter}
          />
          <TextField
            style={{ width: '100%' }}
            required
            autoFocus={!!errorMessage}
            value={password}
            type="password"
            id="authPassword"
            label="password"
            onChange={onChange('password', setPassword)}
            onKeyUp={onSignInEnter}
          />
          <>
            <ButtonWithLoader
              text={'Sign In'}
              color="primary"
              variant="contained"
              disabled={!login || !password}
              isLoading={isSignInLoading}
              onClick={onSignIn}
            />
            <div className={styles.signUpWrapper}>
              <Button
                color="primary"
                variant="outlined"
                disabled={isSignInLoading}
                onClick={onOpenSignUpForm(false)}
              >
                Sign Up
              </Button>
            </div>
          </>
        </form>
      </CardContent>
    </Card>
  );
};
