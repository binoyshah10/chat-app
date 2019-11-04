import { takeEvery, call, put } from "redux-saga/effects";
import axios from 'axios';

export default function* loginWatcherSaga() {
  yield takeEvery("LOGIN", loginWorkerSaga);
}

function* loginWorkerSaga({ payload }) {
  try {
    console.log(payload)
    const userData = yield call(sendLoginInfo(payload));
    yield put({ type: "LOGIN_SUCCESS", userData });
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}

function sendLoginInfo(payload) {
  console.log(payload)
  axios.post('http://localhost:5000/login', {
    emailOrUsername: payload['emailOrUsername'],
    password: payload['password']
  })
  .then(function (response) {
    console.log(response);
    return response;
  })
  .catch(function (error) {
    console.log(error);
  });
}

