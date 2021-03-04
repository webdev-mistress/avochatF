import React from 'react';
import { TextField, Typography, Card, CardContent, Button, CircularProgress } from '@material-ui/core';
import { useAuthForm } from '@/pages/auth/authForm/hook';
import styles from './styles.module.scss';

interface IProps {
    onOpenRegForm: (isAuth: boolean) => any;
}

export const AuthForm = (props: IProps) => {
    const {
        login,
        setLogin,
        password,
        setPassword,
        errorMessage,
        isAuthSpin,
        onAuthEnter,
        onChange,
        onAuth,
    } = useAuthForm();

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
                        onChange={(event) => onChange(event, 'login', setLogin)}
                        onKeyUp={(event) => onAuthEnter(event)}
                    />
                    <TextField
                        style={{ width: '100%' }}
                        required
                        autoFocus={!!errorMessage}
                        value={password}
                        type="password"
                        id="authPassword"
                        label="password"
                        onChange={(event) => onChange(event, 'password', setPassword)}
                        onKeyUp={(event) => onAuthEnter(event)}
                        />

                    {isAuthSpin
                        ?
                        (
                            <div className={styles.authSpin}>
                                <CircularProgress />
                            </div>
                        )
                        : (
                            <>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={onAuth}
                                    disabled={!login || !password}
                                >
                                    Log in
                                </Button>
                                <div className={styles.signUpWrapper}>
                                    <Button
                                        color="primary"
                                        variant="outlined"
                                        onClick={() => props.onOpenRegForm(false)}
                                    >
                                        Sign Up
                                    </Button>

                                </div>
                            </>
                        )
                    }
                </form>
            </CardContent>
        </Card>
    );
};
