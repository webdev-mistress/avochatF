import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Typography, Card, CardContent, Button } from '@material-ui/core';

import { requestUser, removeErrorMessage } from '../../../store/user/actions';
import { selectErrorMessage } from '../../../store/user/selectors';

import styles from './styles.module.scss';

class AuthFormComponent extends Component {
    state = {
        login: '',
        password: '',
    }

    componentDidUpdate(prevProps) {
        if(this.props.errorMessage !== prevProps.errorMessage) {
            this.setState({
                password: '',
            });
        }
    }

    onAuth = (event) => {
        event.preventDefault();
        const { login, password } = this.state;

        this.props.requestUser({ login, password });
    }

    onAuthEnter = event => event.key === 'Enter' && this.onAuth(event);

    onChange = (event, name) => {
        if (this.props.errorMessage) {
            this.props.removeErrorMessage();
        }

        const { value } = event.target;

        this.setState({ [name]: name === 'login' ? value.trim() : value });
    }

    render() {
        return (
            <Card className={styles.card}>
                <CardContent className={styles.cardContent}>
                    <Typography variant="h4">Authorization</Typography>
                    <div className={styles.errorMessage}>{this.props.errorMessage}</div>
                    <form type="post" className={styles.form}>
                        <TextField
                            required
                            value={this.state.login}
                            id="authLogin"
                            label="Login"
                            onChange={(event) => this.onChange(event, 'login')}
                            onKeyUp={(event) => this.onAuthEnter(event)}
                        />
                        <TextField
                            required
                            value={this.state.password}
                            type="password"
                            id="authPassword"
                            label="password"
                            onChange={(event) => this.onChange(event, 'password')}
                            onKeyUp={(event) => this.onAuthEnter(event)}
                        />
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={this.onAuth}
                            disabled={!this.state.login || !this.state.password}
                        >
                            Log in
                        </Button>
                        <div className={styles.signUpWrapper}>
                            <Button
                                color="primary"
                                variant="outlined"
                                onClick={() => this.props.onOpenRegForm(false)}
                            >
                                Sign Up
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        );
    }
}
const mapStateToProps = (state) => ({
    errorMessage: selectErrorMessage(state),
});

const mapDispatchToProps = dispatch => ({
    requestUser: userData => dispatch(requestUser(userData)),
    removeErrorMessage: () => dispatch(removeErrorMessage()),
});

export const AuthForm = connect(mapStateToProps, mapDispatchToProps)(AuthFormComponent);
