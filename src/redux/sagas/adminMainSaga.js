import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';


function* fetchOrganizations() {
    try {
        const response = yield axios.get(`/adminmain`);
        yield put({ type: 'SET_ORGANIZATIONS', payload: response.data });//fetches organizations from database and sets them in state
    } catch (error) {
        console.log('error getting organizations', error);
    }
}


// Deactivate organization so no longer collecting data
function* deactivateOrganization(action) {
    try {
        yield call(axios.put, `adminmain/${action.payload}`);
        // Fetch organizations again to reload 
        yield put({type: 'FETCH_ORGANIZATIONS'});
    } catch (error) {
        console.log('Error in deactivateOrganization in adminMainSaga:', error);
    }
}

/**
 * Update organization's name
 */
function* updateOrganization(action) {
    yield call(axios.post, '/adminmain/org/update', action.payload);
    yield put({ type: 'FETCH_ORGANIZATIONS' });
}

function* adminMainSaga() {
    yield takeLatest('FETCH_ORGANIZATIONS', fetchOrganizations); //when componentDidMount runs this action, it runs this generator function //which then runs fetchOrganizations
    yield takeLatest('DEACTIVATE_ORGANIZATION', deactivateOrganization);
    yield takeLatest('UPDATE_ORGANIZATION', updateOrganization);
}

export default adminMainSaga;
