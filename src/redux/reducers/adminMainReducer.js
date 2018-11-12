const adminMainReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ORGANIZATIONS':
            return action.payload; //organizations are set in an array in reduxState
        default:
            return state;
    }
};

export default adminMainReducer;
