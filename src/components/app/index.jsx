/* eslint-disable react/jsx-max-props-per-line */
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { AuthPage, ChatPage, PomodoroPage } from '../../pages';

import styles from './styles.module.scss';

class App extends React.Component {
    render() {
        const { isAuth } = this.props;

        return (
            <div className={styles.container}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={isAuth ? '/chat' : '/auth'} component={isAuth ? ChatPage : AuthPage} />
                        <Route exact path={'/pomodoro'} component={PomodoroPage} />
                        <Redirect from="/" to={isAuth ? '/chat' : '/auth'} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}
const mapStateToProps = state => ({ isAuth: state.user.isAuth });

export default connect(mapStateToProps)(App);
