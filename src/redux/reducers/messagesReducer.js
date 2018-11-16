const messagesReducer = (state = {
    loginError: false,
    deactivedOrganization: false,
    addedEmployees: false,
    addedManagers: false,
    surveySubmitted: false,
}, action) => {
    //each component of state corresponds to a dialog that lives on app.js
    //on actions that trigger this reducer open or close one of these dialogs
    switch (action.type) {


        // Daniel cases above, Eli Cases below

        default:
            return state;
    }
};

// user will be on the redux state at:
// state.user
export default messagesReducer;