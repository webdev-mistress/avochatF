/* eslint-disable react/jsx-max-props-per-line */
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { AuthPage, ChatPage } from '@/pages';
import { selectUserIsAuth } from '@/redux/store/user/selectors';
import styles from './styles.module.scss';

export const App = () => {
    const hasUser = useSelector(selectUserIsAuth);

    return (
        <div className={styles.container}>
            <BrowserRouter basename={'/'}>
                <Switch>
                    <Route path={hasUser ? '/chat' : '/auth'} component={hasUser ? ChatPage : AuthPage} />
                    <Redirect from="/" to={hasUser ? '/chat' : '/auth'} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};
