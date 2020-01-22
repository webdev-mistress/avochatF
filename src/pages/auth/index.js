import React, { Component } from 'react';
import AuthForm from '../../components/authForm';
import { Container } from '@material-ui/core';

import style from './styles.module.sass';

export class AuthPage extends Component {
    render() {
        return (
            <Container maxWidth="sm" className={style.wrapper}>
                <AuthForm />
            </Container>
        );
    }
}
