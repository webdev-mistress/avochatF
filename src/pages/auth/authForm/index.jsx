import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Typography, Card, CardContent, Button } from '@material-ui/core';

import { requestUser, removeErrorMessage } from '../../../store/user/actions';
import { selectErrorMessage } from '../../../store/user/selectors';

import styles from './styles.module.scss';

export const AuthForm = (props) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const errorMessage = useSelector(selectErrorMessage);
    const dispatch = useDispatch();

    useEffect(() => {
        setPassword('');
    }, [errorMessage]);

    const onAuth = (event) => {
        event.preventDefault();

        dispatch(requestUser({ login, password }));
    };

    const onAuthEnter = event => event.key === 'Enter' && onAuth(event);

    const onChange = (event, name, setState) => {
        if (errorMessage) {
            dispatch(removeErrorMessage());
        }

        const { value } = event.target;

        setState(name === 'login' ? value.trim() : value);
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
                            onClick={() => props.onOpenRegForm(false)}
                        >
                            Sign Up
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};
