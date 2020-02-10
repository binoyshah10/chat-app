import { takeEvery, call, put } from "redux-saga/effects";
import axios from 'axios';
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILED } from '../constants/actionTypes'
axios.defaults.withCredentials = true;

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

export default function* loginWatcherSaga() {
  yield takeEvery(LOGIN, loginWorkerSaga);
}

function* loginWorkerSaga({ payload }) {
  try {
    const response = yield call(sendLoginInfo, payload);
    console.log(response) 
    yield put({ type: LOGIN_SUCCESS, payload: response.data });
  } catch (e) {
    const message = e.response.data.message;
    yield put({ type: LOGIN_FAILED, payload: message });
  }
}

function sendLoginInfo(payload) {
  return axios.post(`${API_BASE}/login`, {
    emailOrUsername: payload['emailOrUsername'],
    password: payload['password']
  })
}

