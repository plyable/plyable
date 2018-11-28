import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//behaviors are the 6 items in the survey which a user judges
//this component gets only behavior information


function* fetchBehaviors(action) {
    try {
        const response = yield axios.get(`/api/adminorg/behavior`);
        yield put({ type: 'SET_BEHAVIORS', payload: response.data });
    } catch (error) {
        console.log('error getting participation', error);
    }
}

function* behaviorSaga() {
    yield takeLatest('FETCH_BEHAVIORS', fetchBehaviors);
}

export default behaviorSaga;
