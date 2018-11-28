const participationReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PARTICIPATION':
            return action.payload;
        default:
            return state;
    }
};//holds a list of all users of a specific organization and whether or not they've completed their survey

export default participationReducer;
