import { USER_FETCH_REQUESTED, USER_FETCH_FAILED, USER_FETCH_SUCCEEDED,
    USER_LOGOUT, REMOVE_AUTH_ERROR_MESSAGE } from '../../constants/store';

export const requestUser = user => ({ type: USER_FETCH_REQUESTED, user });

export const getUser = user => ({ type: USER_FETCH_SUCCEEDED, user });

export const failedUser = () => ({ type: USER_FETCH_FAILED });

export const logoutUser = () => ({ type: USER_LOGOUT });

export const removeErrorMessage = () => ({ type: REMOVE_AUTH_ERROR_MESSAGE });
