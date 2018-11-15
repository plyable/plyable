import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchParticipation(action) {
    try {
        const response = yield axios.get(`/api/surveyresults/${action.payload}`);
        yield put({ type: 'SET_PARTICIPATION', payload: response.data });//fetches users who have participated from database and sets them in state
        console.log('PARTICIPATION: ', response.data);
    } catch (error) {
        console.log('error getting participation', error);
    }
}

function* participationSaga() {
    yield takeLatest('FETCH_PARTICIPATION', fetchParticipation) //when componentDidMount runs this action, it runs this generator function
    //which then runs fetchParticipation

}

export default participationSaga;
