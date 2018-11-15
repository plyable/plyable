const participationReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PARTICIPATION':
            return action.payload;
        default:
            return state;
    }
};

export default participationReducer;
