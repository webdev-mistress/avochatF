import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';

import { selectErrorMessage } from '../../store/user/selectors';
import { removeErrorMessage } from '../../store/user/actions';

import style from './styles.module.scss';
import { AuthForm } from './authForm';
import { RegForm } from './regForm';

class AuthPageComponent extends Component {
    state = {
        isAuthForm: true,
    }

    onToggleForm = (isAuthForm) => {
        if (this.props.errorMessage) {
            this.props.removeErrorMessage();
        }

        this.setState({ isAuthForm });
    }

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

const mapStateToProps = (state) => ({
    errorMessage: selectErrorMessage(state),
});

const mapDispatchToProps = dispatch => ({
    // requestCreateUser: userData => dispatch(requestCreateUser(userData)),
    removeErrorMessage: () => dispatch(removeErrorMessage()),

});

export const AuthPage = connect(mapStateToProps, mapDispatchToProps)(AuthPageComponent);
