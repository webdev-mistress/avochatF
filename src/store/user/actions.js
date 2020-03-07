import { USER_FETCH_REQUESTED, USER_FETCH_FAILED, USER_FETCH_SUCCEEDED,
    USER_LOGOUT, REMOVE_AUTH_ERROR_MESSAGE, USER_CREATE_REQUESTED } from '../../constants/store';

export const requestUser = user => ({ type: USER_FETCH_REQUESTED, payload: { user } });

export const getUser = user => ({ type: USER_FETCH_SUCCEEDED, payload: { user } });

export const failedUser = (errorMessage) => ({ type: USER_FETCH_FAILED, payload: { errorMessage } });

export const logoutUser = () => ({ type: USER_LOGOUT });

export const removeErrorMessage = () => ({ type: REMOVE_AUTH_ERROR_MESSAGE });

export const requestCreateUser = (userData) => ({ type: USER_CREATE_REQUESTED, payload: { userData } });
