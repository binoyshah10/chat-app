import { fork, all } from 'redux-saga/effects'
import loginSaga from "../sagas/loginSaga";
import loginCheckSaga from "../sagas/loginCheckSaga";
import signUpSaga from "../sagas/signUpSaga";
import getAllTeamsSaga from "../sagas/getAllTeamsSaga";
import getChannelsSaga from '../sagas/getChannelsSaga';
import getMessagesSaga from '../sagas/getMessagesSaga';

export default function* rootSaga() {
    yield all([
        fork(loginSaga), 
        fork(loginCheckSaga),
        fork(signUpSaga),
        fork(getAllTeamsSaga),
        fork(getChannelsSaga),
        fork(getMessagesSaga)
    ]);
}