/* eslint-disable react/jsx-max-props-per-line */
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { AuthPage, MainPage } from '../../pages';

import styles from './app.module.css';

class App extends React.Component {
    render() {
        const { history } = this.props;

        console.log(styles, 'myLog styles');

        return (
            <div className={styles.container}>
                <BrowserRouter>
                    <Switch>
                        <Route history={history} path="/auth" component={AuthPage} />
                        <Route history={history} path="/main" component={MainPage} />
                        <Redirect from="/" to="/auth" />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
