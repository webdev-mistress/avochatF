import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '@material-ui/core';

import { selectErrorMessage } from '@/redux/store/user/selectors';
import { removeErrorMessage } from '@/redux/store/user/actions';

import style from './styles.module.scss';
import { AuthForm } from './authForm';
import { RegForm } from './regForm';

export const AuthPage = () => {
    const [isAuthForm, setIsAuthForm] = useState(true);
    const errorMessage = useSelector(selectErrorMessage);
    const dispatch = useDispatch();

    const onToggleForm = (isAuthForm) => {
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
