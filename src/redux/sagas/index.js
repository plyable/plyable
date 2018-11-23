import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import adminMainSaga from './adminMainSaga';
import addEmployeeSaga from './addEmployeeSaga';
import adminOrgSaga from './adminOrgSaga';
import userMainSaga from './userMainSaga';
import addNewOrgSaga from './addNewOrgSaga';
import surveySaga from './surveySaga';
import participationSaga from './participationSaga';
import behaviorSaga from './behaviorSaga';

export default function* rootSaga() {
    yield all([
        adminOrgSaga(),
        loginSaga(),
        registrationSaga(),
        userSaga(),
        adminMainSaga(),
        userMainSaga(),
        addEmployeeSaga(),
        addNewOrgSaga(),
        surveySaga(),
        participationSaga(),
        behaviorSaga(),
    ]);
}
