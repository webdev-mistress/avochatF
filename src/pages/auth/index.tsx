import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '@material-ui/core';

import { selectErrorMessage } from '@/redux/store/user/selectors';
import { removeErrorMessage } from '@/redux/store/user/actions';

import style from './styles.module.scss';
import { AuthForm } from './authForm';
import { RegForm } from './regForm';
import { Dispatch } from 'redux';

export const AuthPage = () => {
    const [isAuthForm, setIsAuthForm] = useState(true);
    const errorMessage = useSelector(selectErrorMessage);
    const dispatch: Dispatch = useDispatch();

    const onToggleForm = (isAuthForm: boolean) => {
        if (errorMessage) {
            dispatch(removeErrorMessage());
        }

        setIsAuthForm(isAuthForm);
    };

    return (
        <Container maxWidth="sm" className={style.wrapper}>
            {isAuthForm
                ? <AuthForm onOpenRegForm={onToggleForm} />
                : <RegForm onOpenAuthForm={onToggleForm} /> }
        </Container>
    );
};
