import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import { connect } from 'react-redux';

class ChatPageComponent extends Component {
    state = {
        status: 'offline',
        messages: [],
    }

    render() {
        return (
            <Container>
                Chat page
                Welcome to chat {this.props.userName}
            </Container>
        );
    }
}

export const ChatPage = connect(state => ({ userName: state.user.name }))(ChatPageComponent);
