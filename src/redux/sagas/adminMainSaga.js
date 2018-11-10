import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchOrganizations(action) {
    try {
        const response = yield axios.get(`/adminmain`, action.payload);
        yield put({ type: 'SET_ORGANIZATIONS', payload: response.data });
        console.log('ORGS: ', response.data);
    } catch (error) {
        console.log('error getting organizations', error);
    }
}

function* adminMainSaga() {
    yield takeLatest('FETCH_ORGANIZATIONS', fetchOrganizations)

}

export default adminMainSaga;
