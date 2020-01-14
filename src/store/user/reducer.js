const initialState = {
    login: 'leyrus',
    password: '12345',
};

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SOME':
            return state;
        default:
            return state;
    }
}
