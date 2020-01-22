import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Typography, Card, CardContent, Button } from '@material-ui/core';

import { requestUser } from '../../store/user/actions';

import styles from './styles.module.sass';
import { getMessages } from '../../api';

class AuthForm extends Component {
    state = {
        login: '',
        password: '',
    }

    onAuth = (event) => {
        getMessages()
            .then(console.log)
            .catch(console.error);
        event.preventDefault();
        const { login, password } = this.state;

        this.props.requestUser({ login, password });
    }

    onChange = (event, name) => this.setState({ [name]: event.target.value })

    render() {
        return (
            <Card className={styles.card}>
                <CardContent className={styles.cardContent}>
                    <Typography variant="h4">Authorization</Typography>
                    <form type="post" className={styles.form}>
                        <TextField
                            required
                            id="authLogin"
                            label="Login"
                            onChange={(event) => this.onChange(event, 'login')}
                        />
                        <TextField
                            required
                            type="password"
                            id="authPassword"
                            label="password"
                            onChange={(event) => this.onChange(event, 'password')}
                        />
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={this.onAuth}
                        >
                            Log in
                        </Button>
                    </form>
                </CardContent>
            </Card>
        );
    }
}
const mapStateToProps = () => ({
    // state,
});
const mapDispatchToProps = dispatch => ({
    requestUser: userData => dispatch(requestUser(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
