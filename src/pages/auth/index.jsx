import React, { Component } from 'react';
import { Container } from '@material-ui/core';

import style from './styles.module.scss';
import { AuthForm } from './authForm';
import { RegForm } from './regForm';

export class AuthPage extends Component {
    state = {
        isAuthForm: false,
    }

    onToggleForm = (isAuthForm) => this.setState({ isAuthForm });

    render() {
        return (
            <Container maxWidth="sm" className={style.wrapper}>
                {this.state.isAuthForm ? <AuthForm
                    onOpenRegForm={this.onToggleForm}
                /> : <RegForm
                    onOpenAuthForm={this.onToggleForm}
                /> }
            </Container>
        );
    }
}
