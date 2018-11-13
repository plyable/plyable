import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addNewSurveyResults(action) {
    try {

        console.log('addNewSurveyResults action.payload:', action.payload);
        yield call(axios.post, '/api/surveyresults', action.payload);
    } catch (error) {
        console.log('ERROR in addNewSurveyResults saga:', error)
    };
};

function* surveySaga() {
    yield takeLatest('SEND_SURVEY_RESULTS', addNewSurveyResults);
}

export default surveySaga;//sends survey scores to server