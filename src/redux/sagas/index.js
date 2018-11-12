import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import adminMainSaga from './adminMainSaga';

import addEmployeeSaga from './addEmployeeSaga';
// rootSaga is the primary saga.
// It bundles up all of the other sagas so the app can use them.
// This is imported in index.js as rootSaga

// manny start
import adminOrgSaga from './adminOrgSaga';
// manny end
//daniel start
import addNewOrgSaga from './addNewOrgSaga';
//daniel end

export default function* rootSaga() {
    yield all([
        adminOrgSaga(),
        loginSaga(),
        registrationSaga(),
        userSaga(),
        adminMainSaga(),
        addEmployeeSaga(),
        addNewOrgSaga(),
    ]);
}
