/* user */
export enum User {
    FETCH_REQUESTED = 'USER_FETCH_REQUESTED',
    FETCH_SUCCEEDED = 'USER_FETCH_SUCCEEDED',
    FETCH_FAILED = 'USER_FETCH_FAILED',
    CREATE_REQUESTED = 'USER_CREATE_REQUESTED',
    LOGOUT = 'USER_LOGOUT',
    REMOVE_AUTH_ERROR_MESSAGE = 'REMOVE_AUTH_ERROR_MESSAGE',
    ADD_USER_TO_CHAT = 'ADD_USER_TO_CHAT',
    GET_SELECTED_CHAT = 'GET_SELECTED_CHAT',
    EDIT_OLD_USER = 'EDIT_OLD_USER',
    ADD_NEW_USER_VALUE = 'ADD_NEW_USER_VALUE',
    CONFIRM_REQUESTED = 'CONFIRM_REQUESTED',
}

/* chat */
export enum Chat {
    MESSAGES_REQUESTED = 'MESSAGES_REQUESTED',
    MESSAGES_SUCCEEDED = 'MESSAGES_SUCCEEDED',
    MESSAGES_FAILED = 'MESSAGES_FAILED',
    CREATE_CHAT = 'CREATE_CHAT',
    ADD_NEW_CHAT = 'ADD_NEW_CHAT',
    DELETE_CHAT = 'DELETE_CHAT',
    DELETE_OLD_CHAT = 'DELETE_OLD_CHAT',
    SEND_MESSAGE = 'SEND_MESSAGE',
    SEND_MESSAGE_FAILED = 'SEND_MESSAGE_FAILED',
    DELETE_MESSAGE = 'DELETE_MESSAGE',
    DELETE_MESSAGE_FAILED = 'DELETE_MESSAGE_FAILED',
    EDIT_MESSAGE = 'EDIT_MESSAGE',
    GET_ACTIVE_CHAT = 'GET_ACTIVE_CHAT',
    CLEAR_CHAT = 'CLEAR_CHAT',
    DELETE_USER_FROM_CHAT = 'DELETE_USER_FROM_CHAT',
    GET_CHAT_PARTICIPANTS = 'GET_CHAT_PARTICIPANTS',
    GET_CHAT_PARTICIPANTS_LOADED = 'GET_CHAT_PARTICIPANTS_LOADED',
    DELETE_UNWANTED_USER = 'DELETE_UNWANTED_USER',
    EDIT_CHAT_NAME = 'EDIT_CHAT_NAME',
    ADD_NEW_CHAT_NAME = 'ADD_NEW_CHAT_NAME',
}
