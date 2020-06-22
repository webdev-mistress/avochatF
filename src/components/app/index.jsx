/* eslint-disable react/jsx-max-props-per-line */
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { AuthPage, ChatPage, PomodoroPage } from '../../pages';
import { selectIsAuth } from '../../redux/store/user/selectors';

import styles from './styles.module.scss';

export const App = () => {
    const isAuth = useSelector(selectIsAuth);

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
};
