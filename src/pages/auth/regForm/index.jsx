import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TextField, Typography, Card, CardContent, Button, CircularProgress } from '@material-ui/core';

import { requestCreateUser, removeErrorMessage } from '@/redux/store/user/actions';
import { selectErrorMessage, selectIsAuthSpin } from '@/redux/store/user/selectors';

import styles from './styles.module.scss';

export const RegForm = (props) => {
    const initialState = {
        name: '',
        login: '',
        password1: '',
        password2: '',
        disabledButton: false,
    };
    const [state, setState] = useState(initialState);
    const { name, login, password1, password2, disabledButton } = state;
    const isAuthSpin = useSelector(selectIsAuthSpin);
    const errorMessage = useSelector(selectErrorMessage);
    const dispatch = useDispatch();

    const onCreateUser = useCallback((event) => {
        event.preventDefault();
        if (disabledButton) {
            return;
        }
        setState({ ...state, disabledButton: true });
        dispatch(requestCreateUser({ name, login, password1, password2 }));
    }, [disabledButton, dispatch, login, name, password1, password2, state]);

    const onChange = useCallback((event, name) => {
        if (errorMessage) {
            dispatch(removeErrorMessage());
        }
        const { value } = event.target;
        setState({
            ...state,
            [name]: name === 'login' || name === 'name' ? value.trim() : value,
            disabledButton: false,
        });
    }, [dispatch, errorMessage, state]);

    const disabledRegFormButton = !name || !login || !password1 || !password2 || state.disabledButton;

    return (
        <Card className={styles.card}>
            <CardContent className={styles.cardContent}>
                <Typography variant="h4">Registration</Typography>
                <div className={styles.errorMessage}>{errorMessage}</div>
                <form type="post" className={styles.form}>
                    <TextField
                        autoFocus
                        required
                        value={name}
                        id="authLogin"
                        label="Name"
                        onChange={(event) => onChange(event, 'name')}
                        onKeyUp={(event) => event.key === 'Enter' && onCreateUser(event)}
                    />
                    <TextField
                        required
                        value={login}
                        id="authLogin"
                        label="Login"
                        onChange={(event) => onChange(event, 'login')}
                        onKeyUp={(event) => event.key === 'Enter' && onCreateUser(event)}
                    />
                    <TextField
                        required
                        value={password1}
                        type="password"
                        id="authPassword"
                        label="password"
                        onChange={(event) => onChange(event, 'password1')}
                        onKeyUp={(event) => event.key === 'Enter' && onCreateUser(event)}
                    />
                    <TextField
                        required
                        value={password2}
                        type="password"
                        id="authPassword"
                        label="repeat password"
                        onChange={(event) => onChange(event, 'password2')}
                        onKeyUp={(event) => event.key === 'Enter' && onCreateUser(event)}
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
                                    onClick={onCreateUser}
                                    disabled={disabledRegFormButton}
                                >
                                    Sign Up
                                </Button>
                                <div className={styles.signUpWrapper}>
                                    <Button
                                        color="primary"
                                        variant="outlined"
                                        onClick={() => props.onOpenAuthForm(true)}
                                    >
                                        Sign In
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
