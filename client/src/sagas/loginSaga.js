import { takeEvery, call, put } from "redux-saga/effects";
import axios from 'axios';

import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILED } from '../constants/actionTypes'

axios.defaults.withCredentials = true;

export default function* loginWatcherSaga() {
  yield takeEvery(LOGIN, loginWorkerSaga);
}

function* loginWorkerSaga({ payload }) {
  try {
    const response = yield call(sendLoginInfo, payload);
    console.log(response) 
    yield put({ type: LOGIN_SUCCESS, payload: response.payload });
  } catch (e) {
    console.log(e)
    yield put({ type: LOGIN_FAILED, payload: e });
  }
}

function sendLoginInfo(payload) {
  return axios.post('http://localhost:5000/login', {
    emailOrUsername: payload['emailOrUsername'],
    password: payload['password']
  })
}

// function sendLoginInfo(payload) {
//   return fetch('http://localhost:5000/login', {
//     method: 'post',
//     body: JSON.stringify({
//       emailOrUsername: payload['emailOrUsername'],
//       password: payload['password']
//     }),
//     credentials: 'include',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//   }).then(response => response.json())
// }

