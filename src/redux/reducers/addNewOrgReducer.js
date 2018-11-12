const addNewOrgReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_NEW_ORGANIZATION':
            return action.payload;
        default:
            return state;
    };
};

export default addNewOrgReducer;