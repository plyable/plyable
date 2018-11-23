import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addNewOrganization(action) {
    try {
        yield call(axios.post, '/adminmain', action.payload);
        yield put({ type: 'FETCH_ORGANIZATIONS' })
    } catch (error) {
        console.log('ERROR in addNewOrg saga:', error)
    };
};

function* addNewOrgSaga() {
    yield takeLatest('ADD_NEW_ORGANIZATION', addNewOrganization);
}

export default addNewOrgSaga;