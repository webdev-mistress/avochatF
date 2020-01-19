import React, { Component } from 'react';
import { Container } from '@material-ui/core';

export class ChatPage extends Component {
    state = {
        status: 'offline',
        messages: [],
    }

    render() {
        return (
            <Container>
                Chat page
            </Container>
        );
    }
}

