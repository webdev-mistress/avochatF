import React from 'react';
import {
  TextField,
  Typography,
  Card,
  CardContent,
  Button,
} from '@material-ui/core';
import styles from './styles.module.scss';
import { ButtonWithLoader } from '@/components/ui/buttonWithLoader';
import { useSignUpForm } from '@/pages/auth/signUpForm/hook';

interface IProps {
  onOpenSignInForm: (isAuth: boolean) => any;
}

export const SignUpForm: React.FunctionComponent<IProps> = ({ onOpenSignInForm }) => {
  const {
    isSignUpLoading,
    onCreateUser,
    onChange,
    onKeyUpEnter,
    disabledRegFormButton,
    login,
    password1,
    password2,
    name,
    email,
    state,
    isRegFinished,
  } = useSignUpForm();

  return (
    <Card className={styles.card}>
      {isRegFinished
        ? (<div>Check your email and confirm registration</div>)
        : (
          <CardContent className={styles.cardContent} onKeyUp={onKeyUpEnter}>
            <Typography variant="h4">Registration</Typography>
            <form className={styles.form}>
              <TextField
                required
                value={email}
                id="authEmail"
                label="email"
                onChange={onChange('email')}
              />
              <TextField
                required
                value={login}
                id="authLogin"
                label="Login"
                onChange={onChange('login')}
              />
              <TextField
                autoFocus
                required
                value={name}
                id="authLogin"
                label="Name"
                onChange={onChange('name')}
              />
              <TextField
                required
                value={password1}
                type="password"
                id="authPassword"
                label="password"
                onChange={onChange('password1')}
              />
              <TextField
                required
                value={password2}
                type="password"
                id="authPassword"
                label="repeat password"
                onChange={onChange('password2')}
              />
              {!!state.errorText && (
                <div className={styles.errorText}>{state.errorText}</div>
              )}
              <>
                <ButtonWithLoader
                  text={'Sign Up'}
                  color="primary"
                  variant="contained"
                  isLoading={isSignUpLoading}
                  onClick={onCreateUser}
                  disabled={disabledRegFormButton}
                />
                <div className={styles.signUpWrapper}>
                  <Button
                    color="primary"
                    variant="outlined"
                    disabled={isSignUpLoading}
                    onClick={onOpenSignInForm(true)}
                  >
                    Sign In
                  </Button>
                </div>
              </>
            </form>
          </CardContent>)
      }
    </Card>
  );
};
