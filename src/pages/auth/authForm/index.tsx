import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { TextField, Typography, Card, CardContent, Button, CircularProgress } from '@material-ui/core';
import { requestUser, removeErrorMessage } from '@/redux/store/user/actions';
import { selectErrorMessage, selectIsAuthSpin } from '@/redux/store/user/selectors';

import styles from './styles.module.scss';

interface IProps {
    onOpenRegForm: (isAuth: boolean) => any;
}

export const AuthForm = (props: IProps) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const errorMessage = useSelector(selectErrorMessage);
    const isAuthSpin = useSelector(selectIsAuthSpin);
    const dispatch: Dispatch = useDispatch();

    useEffect(() => {
        errorMessage && setPassword('');
    }, [errorMessage]);

    const onAuth = useCallback((event) => {
        event.preventDefault();
        if (!login || !password) {
            return;
        }
        dispatch(requestUser({ login, password }));
    }, [dispatch, login, password]);

    const onAuthEnter = useCallback((event) => {
        event.key === 'Enter' && onAuth(event);
    }, [onAuth]);

    const onChange = useCallback((event, name, setState) => {
        const { value } = event.target;
        setState(name === 'login' ? value.trim() : value);

        if (errorMessage) {
            dispatch(removeErrorMessage());
        }
    }, [dispatch, errorMessage]);

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
