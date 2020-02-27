import _ from 'lodash';

import { USER_FETCH_SUCCEEDED, USER_FETCH_FAILED, USER_LOGOUT, REMOVE_AUTH_ERROR_MESSAGE } from '../../constants/store';

const initialState = {
    isAuth: false,
};

export function userReducer(state = initialState, action) {
    const cloneState = _.cloneDeep(state);

    switch (action.type) {
        case USER_FETCH_SUCCEEDED:
            if(action.user.isAuth) {
                delete cloneState.errorMessage;
            }

            return {
                ...cloneState,
                ...action.user,
            };
        case REMOVE_AUTH_ERROR_MESSAGE:
            delete cloneState.errorMessage;

            return cloneState;
        case USER_FETCH_FAILED:
            return {
                isAuth: false,
                errorMessage: action.payload,
            };

        case USER_LOGOUT:
            return {
                isAuth: false,
            };

        default:
            return state;
    }
}
