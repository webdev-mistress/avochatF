import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Typography, Card, CardContent, Button, FormGroup } from '@material-ui/core';

import { setUserData, setAuth } from '../../store/user/actions';

import styles from './styles.module.sass';
import { Link } from 'react-router-dom';

class AuthForm extends Component {
    state = {
        login: '',
        password: '',
    }

    onAuth = () => {
        const { login, password } = this.state;

        this.props.setUserData({ login, password });

        if (login === 'Lena' && password === 'love') {
            this.props.setAuth(true);
        }
    }

    onChange = (event, name) => this.setState({ [name]: event.target.value })

    render() {
        return (
            <Card className={styles.card}>
                <CardContent className={styles.cardContent}>
                    <Typography variant="h4">Authorization</Typography>
                    <FormGroup>
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
                        <Link to="/chat">
                            <Button color="primary" variant="contained" onClick={this.onAuth}>
                                Log in
                            </Button>
                        </Link>
                    </FormGroup>
                </CardContent>
            </Card>
        );
    }
}
const mapStateToProps = () => ({
    // state,
});
const mapDispatchToProps = dispatch => ({
    setUserData: userData => dispatch(setUserData(userData)),
    setAuth: isAuth => dispatch(setAuth(isAuth)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
