import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import adminMainReducer from './adminMainReducer';
import survey from './surveyReducer';


const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  adminMainReducer, //contains organizations in redux state
  survey, //this will hold the results of a users weekly survey
});

export default rootReducer;
