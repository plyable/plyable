import { call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Saga To Add List of Employee Emails
function* addEmployeeEmail(action) {
  try{
    yield call(axios.post, '/api/employee', action.payload);
  } catch (error) {
    console.log('ERROR in addEmployee saga:', error)
  }
}

function* addEmployeeSaga() {
  yield takeLatest('ADD_EMPLOYEES', addEmployeeEmail);
}

export default addEmployeeSaga;