import { USER_FETCH_REQUESTED, USER_FETCH_FAILED, USER_FETCH_SUCCEEDED } from '../../constants/store';

export const requestUser = user => ({ type: USER_FETCH_REQUESTED, user });

export const getUser = user => ({ type: USER_FETCH_SUCCEEDED, user });

export const failedUser = () => ({ type: USER_FETCH_FAILED });

