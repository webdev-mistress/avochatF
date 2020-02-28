import _ from 'lodash';

import { USER_FETCH_SUCCEEDED, USER_FETCH_FAILED, USER_LOGOUT } from '../../constants/store';

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
        case USER_FETCH_FAILED:
            return {
                isAuth: false,
                errorMessage: action.payload,
            };

        case USER_LOGOUT:
            return initialState;
        default:
            return state;
    }
}
