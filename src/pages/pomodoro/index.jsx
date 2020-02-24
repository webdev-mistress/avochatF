import React, { Component } from 'react';
import { Container } from '@material-ui/core';

import style from './styles.sass';

export class PomodoroPage extends Component {
    render() {
        return (
            <Container maxWidth="sm" className={style.wrapper}>
               Pomodoro
            </Container>
        );
    }
}
