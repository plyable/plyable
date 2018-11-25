import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Saga To Add List of Employee Emails
function* addEmployeeEmail(action) {
  try {
    yield put({ type: 'SENDING_EMAILS' });
    const response = yield call(axios.post, '/api/employee', action.payload);
    
    if (response.status === 204) {
      yield put({ type: 'EMAIL_REDUNDANT' });
    } else {
      yield put({ type: 'FINISH_EMAILS' });
    }
  } catch (error) {
    console.log('ERROR in addEmployee saga:', error);
    yield put({type: 'EMAIL_ERROR'});
  }
}

function* reinviteEmployee(action) {
  try {
    yield axios({
      method: 'PUT',
      url: '/api/employee/reinvite',
      params: {email: action.payload}
    });
    yield put({ type: 'EMPLOYEE_REINVITED' });
  } catch (error) {
    console.log('ERROR in reinviteEmployee saga:', error);
  }
}

function* editEmployee(action) {
  try {
    yield axios({
      method: 'PUT',
      url: '/api/employee/email',
      params: {
        newEmail: action.payload.newEmail,
        oldEmail: action.payload.oldEmail,
      }
    });
    yield put({ type: 'FETCH_PARTICIPATION', payload: action.payload.org_id});
  } catch (error) {
    console.log('ERROR in editEmployee saga:', error);
  }
}

function* addEmployeeSaga() {
  yield takeLatest('ADD_EMPLOYEES', addEmployeeEmail);
  yield takeLatest('REINVITE', reinviteEmployee);
  yield takeLatest('EDIT_EMPLOYEE', editEmployee);
}

export default addEmployeeSaga;