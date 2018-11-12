import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchOrganizations(action) {
    try {
        const response = yield axios.get(`/adminmain`, action.payload);
        yield put({ type: 'SET_ORGANIZATIONS', payload: response.data });//fetches organizations from database and sets them in state
        console.log('ORGS: ', response.data);
    } catch (error) {
        console.log('error getting organizations', error);
    }
}

function* adminMainSaga() {
    yield takeLatest('FETCH_ORGANIZATIONS', fetchOrganizations) //when componentDidMount runs this action, it runs this generator function
    //which then runs fetchOrganizations

}

export default adminMainSaga;
