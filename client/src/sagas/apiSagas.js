import { takeEvery, call, put } from "redux-saga/effects";
import axios from 'axios';

export default function* watcherSaga() {
  yield takeEvery("LOGIN", workerSaga);
}

function* workerSaga({ payload }) {
  try {
    const payload = yield call(getData(payload));
    yield put({ type: "DATA_LOADED", payload });
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}

function getData() {
  axios.post('localhost:5000/login', {
    emailOrUsername: payload.emailOrUsername,
    password: payload.password
  })
  .then(function (response) {
    console.log(response);
    return response;
  })
  .catch(function (error) {
    console.log(error);
  });
}

