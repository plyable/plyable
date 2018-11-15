import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addNewSurveyResults(action) {
    try {
        yield call(axios.post, '/api/surveyresults', action.payload);

        const response = yield call(axios.get, `/api/main/survey/status`);
        const surveyWeek = response.data[0].survey_week;

        yield put({ type: 'ADD_SURVEY_STATUS', payload: { survey_week: surveyWeek } });
        window.location.hash = "#/main";
    } catch (error) {
        console.log('ERROR in addNewSurveyResults saga:', error)
    };
};

function* surveySaga() {
    yield takeLatest('SEND_SURVEY_RESULTS', addNewSurveyResults);
}

export default surveySaga;//sends survey scores to server