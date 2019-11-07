import { fork, all } from 'redux-saga/effects'
import loginSaga from "../sagas/loginSaga";
import loginCheckSaga from "../sagas/loginCheckSaga";
import signUpSaga from "../sagas/signUpSaga";

export default function* rootSaga() {
    yield all([
        fork(loginSaga), 
        fork(loginCheckSaga),
        fork(signUpSaga),
    ]);
}