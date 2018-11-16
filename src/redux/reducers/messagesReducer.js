const messagesReducer = (state = {
    loginError: false,
    deactivedOrganization: false,
    addedEmployees: false,
    addedManagers: false,
    surveySubmitted: false,
    sendingEmail: false,
}, action) => {
    //each component of state corresponds to a dialog that lives on app.js
    //on actions that trigger this reducer open or close one of these dialogs
    switch (action.type) {


        // Daniel cases above, Eli Cases below

        case 'SENDING_EMAILS':
            return {
                ...state,
                sendingEmail: true,
            }
        
        case 'FINISH_EMAILS':
            return {
                ...state, sendingEmail: false,
            }

        default:
            return state;
    }
};

// user will be on the redux state at:
// state.user
export default messagesReducer;