const avgData = (state = [], action) => {
    switch (action.type) {
        case 'GET_AVG_DATA':
            return action.payload;
        default:
            return state;
    }
}

export default avgData;