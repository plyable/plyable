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

function* addEmployeeSaga() {
  yield takeLatest('ADD_EMPLOYEES', addEmployeeEmail);
}

export default addEmployeeSaga;