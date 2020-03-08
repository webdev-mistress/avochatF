import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';

import { selectErrorMessage } from '../../store/user/selectors';
import { removeErrorMessage } from '../../store/user/actions';

import style from './styles.module.scss';
import { AuthForm } from './authForm';
import { RegForm } from './regForm';

const AuthPageComponent = (props) => {
    const [isAuthForm, setIsAuthForm] = useState(true);

    const onToggleForm = (isAuthForm) => {
        if (props.errorMessage) {
            props.removeErrorMessage();
        }

        setIsAuthForm(isAuthForm);
    };

    return (
        <Container maxWidth="sm" className={style.wrapper}>
            {isAuthForm ? <AuthForm
                onOpenRegForm={onToggleForm}
            /> : <RegForm
                onOpenAuthForm={onToggleForm}
            /> }
        </Container>
    );
};

const mapStateToProps = (state) => ({
    errorMessage: selectErrorMessage(state),
});

const mapDispatchToProps = dispatch => ({
    removeErrorMessage: () => dispatch(removeErrorMessage()),

});

export const AuthPage = connect(mapStateToProps, mapDispatchToProps)(AuthPageComponent);
