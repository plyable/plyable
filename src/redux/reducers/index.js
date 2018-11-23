import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import adminMainReducer from './adminMainReducer';
import survey from './surveyReducer';
import addEmployeeReducer from './addEmployeeReducer';
import participationReducer from './participationReducer';
import messagesReducer from './messagesReducer';
// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga
import adminChartData from './adminOrgReducer';
import behaviorReducer from './behaviorsReducer';
import addNewOrgReducer from './addNewOrgReducer';

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  adminMainReducer, //contains organizations in redux state
  addEmployeeReducer,
  adminChartData,
  survey, //this will hold the results of a users weekly survey
  addNewOrgReducer,
  participationReducer,
  behaviorReducer,
  messagesReducer,
});

export default rootReducer;
