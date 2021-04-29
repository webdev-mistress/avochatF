import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { AuthPage, ChatPage, ConfirmPage } from '@/pages';
import { selectUserIsAuth } from '@/redux/store/user/selectors';
import styles from './styles.module.scss';

export const App: React.FunctionComponent = () => {
  const hasUser = useSelector(selectUserIsAuth);

  return (
    <div className={styles.container}>
      <BrowserRouter basename={'/'}>
        <Switch>
          <Route
            exact path={hasUser ? '/chat' : '/auth'}
            component={hasUser ? ChatPage : AuthPage} />
          <Route path={'/confirm'} component={ConfirmPage} />
          <Redirect from="/" to={hasUser ? '/chat' : '/auth'} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};
