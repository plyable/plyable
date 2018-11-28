import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
    yield axios.post('api/user/register', action.payload);

    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload });
    
    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({type: 'SET_TO_LOGIN_MODE'});
  } catch (error) {
      console.log('Error with user registration:', error);
      yield put({type: 'REGISTRATION_FAILED'});
  }
}

function* registerInvited(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    yield axios.post('api/user/invite', action.payload, config);
    //logs in the user and allow them to continue to set their
    //password as something of their own choosing
    //this will dispatch an action type which triggers a SnackBar alert
    yield put({ type: 'REGISTRATION_COMPLETED_SNACKBAR' });
    window.location = '#/main';
  } catch (error) {
    console.log('Error with invited user registration:', error);
    yield put({ type: 'REGISTER_ERROR' });
  }
}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
  yield takeLatest('REGISTER_INVITED', registerInvited);
}

export default registrationSaga;
