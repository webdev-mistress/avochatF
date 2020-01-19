/* eslint-disable react/jsx-max-props-per-line */
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';

import { AuthPage, ChatPage } from '../../pages';

import styles from './styles.module.sass';

class App extends React.Component {
    render() {
        const { history, isAuth } = this.props;

        return (
            <Container className={styles.container}>
                <BrowserRouter>
                    <Switch>
                        {isAuth && <Route history={history} path="/chat" component={ChatPage} />}
                        <Route history={history} path="/auth" component={AuthPage} />
                        <Redirect from="/" to="/auth" />
                    </Switch>
                </BrowserRouter>
            </Container>
        );
    }
}
const mapStateToProps = state => ({ isAuth: state.user.isAuth });

export default connect(mapStateToProps)(App);
