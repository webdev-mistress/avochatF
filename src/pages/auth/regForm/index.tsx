import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Typography, Card, CardContent, Button, CircularProgress } from '@material-ui/core';
import { requestCreateUser, removeErrorMessage } from '@/redux/store/user/actions';
import { selectErrorMessage, selectIsAuthSpin } from '@/redux/store/user/selectors';
import styles from './styles.module.scss';

interface IProps {
    onOpenAuthForm: (isAuth: boolean) => any;
}

export const RegForm = (props: IProps) => {
    const initialState = {
        email: '',
        name: '',
        login: '',
        password1: '',
        password2: '',
        disabledButton: false,
        errorText: '',
        isRegFinished: false,
    };
    const [state, setState] = useState(initialState);
    const { email, name, login, password1, password2, disabledButton } = state;
    const isAuthSpin = useSelector(selectIsAuthSpin);
    const errorMessage = useSelector(selectErrorMessage);
    const dispatch = useDispatch();

    const onCreateUser = useCallback((event) => {
        event.preventDefault();
        if (disabledButton) {
            return;
        }
        if(password1 !== password2) {
           setState((prev) => ({
               ...prev,
               errorText: 'Passwords are not equal!',
           }));

           return;
        }
        setState({ ...state, disabledButton: true, isRegFinished: true });
        dispatch(requestCreateUser({ email, name, login, password: password1 }));
    }, [disabledButton, dispatch, email, login, name, password1, password2, state]);

    const onChange = useCallback((event, name) => {
        if (errorMessage) {
            dispatch(removeErrorMessage());
        }
        const { value } = event.target;
        setState({
            ...state,
            [name]: name === 'login' || name === 'name' || name === 'email' ? value.trim() : value,
            disabledButton: false,
            errorText: '',
        });
    }, [dispatch, errorMessage, state]);

    const disabledRegFormButton = !name || !login || !password1 || !password2 || state.disabledButton;

    return (
        <Card className={styles.card}>
            {state.isRegFinished
                ? (<div>Check your email and confirm registration</div>)
                : (
                    <CardContent className={styles.cardContent}>
                        <Typography variant="h4">Registration</Typography>
                        <div className={styles.errorMessage}>{errorMessage}</div>
                        <form className={styles.form}>
                            <TextField
                            required
                            value={email}
                            id="authEmail"
                            label="email"
                            onChange={(event) => onChange(event, 'email')}
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
                            {!!state.errorText && (
                            <div className={styles.errorText}>{state.errorText}</div>
                        )}
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
                    </CardContent>)
            }
        </Card>
    );
};
