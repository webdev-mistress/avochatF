import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TextField, Typography, Card, CardContent, Button } from '@material-ui/core';

import { requestCreateUser, removeErrorMessage } from '../../../store/user/actions';
import { selectErrorMessage } from '../../../store/user/selectors';

import styles from './styles.module.scss';

class RegFormComponent extends Component {
    state = {
        name: '',
        login: '',
        password1: '',
        password2: '',
        disabledButton: false,
    }

    onCreateUser = (event) => {
        event.preventDefault();
        const { name, login, password1, password2 } = this.state;

        this.setState({ disabledButton: true });

        this.props.requestCreateUser({ name, login, password1, password2 });
    }

    onCreateUserEnter = event => event.key === 'Enter' && this.onCreateUser(event);

    onChange = (event, name) => {
        if (this.props.errorMessage) {
            this.props.removeErrorMessage();
        }

        const { value } = event.target;

        this.setState({
            [name]: name === 'login' || name === 'name' ? value.trim() : value,
            disabledButton: false,
         });
    }

    render() {
        const { name, login, password1, password2, disabledButton: disabledBtn } = this.state;

        const disabledButton = !name || !login || !password1 || !password2 || disabledBtn;

        return (
            <Card className={styles.card}>
                <CardContent className={styles.cardContent}>
                    <Typography variant="h4">Registration</Typography>
                    <div className={styles.errorMessage}>{this.props.errorMessage}</div>
                    <form type="post" className={styles.form}>
                        <TextField
                            required
                            value={name}
                            id="authLogin"
                            label="Name"
                            onChange={(event) => this.onChange(event, 'name')}
                            onKeyUp={(event) => this.onCreateUserEnter(event)}
                        />
                        <TextField
                            required
                            value={login}
                            id="authLogin"
                            label="Login"
                            onChange={(event) => this.onChange(event, 'login')}
                            onKeyUp={(event) => this.onCreateUserEnter(event)}
                        />
                        <TextField
                            required
                            value={password1}
                            type="password"
                            id="authPassword"
                            label="password"
                            onChange={(event) => this.onChange(event, 'password1')}
                            onKeyUp={(event) => this.onCreateUserEnter(event)}
                        />
                        <TextField
                            required
                            value={password2}
                            type="password"
                            id="authPassword"
                            label="repeat password"
                            onChange={(event) => this.onChange(event, 'password2')}
                            onKeyUp={(event) => this.onCreateUserEnter(event)}
                        />
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={this.onCreateUser}
                            disabled={disabledButton}
                        >
                            Sign Up
                        </Button>
                        <div className={styles.signUpWrapper}>
                            <Button
                                color="primary"
                                variant="outlined"
                                onClick={() => this.props.onOpenAuthForm(true)}
                            >
                                Sign In
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
    requestCreateUser: userData => dispatch(requestCreateUser(userData)),
    removeErrorMessage: () => dispatch(removeErrorMessage()),

});

export const RegForm = connect(mapStateToProps, mapDispatchToProps)(RegFormComponent);
