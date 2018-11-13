const loginMode = (state = '', action) => {
    switch (action.type) {
      case 'REGISTRATION_ACTIVE':
        return 'register';
      case 'TIMEROUT_ERROR':
        return 'timedout';
      default:
        return state;
    }
  };

// loginMode will be on the redux state at:
// state.loginMode
  export default loginMode;
  