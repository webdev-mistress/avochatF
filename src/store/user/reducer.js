import { SET_USER_DATA, SET_AUTH } from '../../constants/store';

const initialState = {
    login: '',
    password: '',
    isAuth: false,
};

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_DATA:
            const { login, password } = action.user;

            return { ...state, login, password };
        case SET_AUTH:
            return { ...state, isAuth: true || action.isAuth };
        default:
            return state;
    }
}
