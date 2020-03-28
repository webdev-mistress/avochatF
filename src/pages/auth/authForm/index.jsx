import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Typography, Card, CardContent, Button } from '@material-ui/core';

import { requestUser, removeErrorMessage } from '../../../store/user/actions';
import { selectErrorMessage } from '../../../store/user/selectors';

import styles from './styles.module.scss';

export const AuthForm = ({ onOpenRegForm }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const errorMessage = useSelector(selectErrorMessage);
    const dispatch = useDispatch();

    useEffect(() => errorMessage && setPassword(''), [errorMessage]);

    const onAuth = (event) => {
        event.preventDefault();

        if (!login || !password) {
            return;
        }

        dispatch(requestUser({ login, password }));
    };

    const onAuthEnter = event => event.key === 'Enter' && onAuth(event);

    const onChange = (event, name, setState) => {
        const { value } = event.target;
        setState(name === 'login' ? value.trim() : value);

        if (errorMessage) {
            dispatch(removeErrorMessage());
        }
    };

    return (
        <Card className={styles.card}>
            <CardContent className={styles.cardContent}>
                <Typography variant="h4">Authorization</Typography>
                <div className={styles.errorMessage}>{errorMessage}</div>
                <form type="post" className={styles.form}>
                    <TextField
                        required
                        value={login}
                        id="authLogin"
                        label="Login"
                        onChange={(event) => onChange(event, 'login', setLogin)}
                        onKeyUp={(event) => onAuthEnter(event)}
                    />
                    <TextField
                        required
                        autoFocus={!!errorMessage}
                        value={password}
                        type="password"
                        id="authPassword"
                        label="password"
                        onChange={(event) => onChange(event, 'password', setPassword)}
                        onKeyUp={(event) => onAuthEnter(event)}
                    />
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
                            onClick={() => onOpenRegForm(false)}
                        >
                            Sign Up
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};
