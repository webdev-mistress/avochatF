import { SET_USER_DATA, SET_AUTH } from '../../constants/store';

export const setUserData = user => ({ type: SET_USER_DATA, user });

export const setAuth = isAuth => ({ type: SET_AUTH, isAuth });
