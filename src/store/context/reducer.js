const initialState = {
    field: 'test',
};

export function contextReducer(state = initialState, action) {
    switch (action.type) {
        case 'SOME':
            return state;
        default:
            return state;
    }
}
