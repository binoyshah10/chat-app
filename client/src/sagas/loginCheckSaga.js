import { takeEvery, call, put } from "redux-saga/effects";
import { LOGIN_CHECK_SUCCESS, LOGIN_CHECK_FAILED } from '../constants/actionTypes'
import axios from 'axios';
axios.defaults.withCredentials = true;

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

export default function* loginCheckWatcherSaga() {
  yield takeEvery("LOGIN_CHECK", loginCheckWorkerSaga);
}

function* loginCheckWorkerSaga() {
  try {
    yield put({ type: 'LOGIN_CHECK_LOADING' });
    let response = yield call(loginCheck);
    console.log(response)
    yield put({ type: LOGIN_CHECK_SUCCESS, payload: response.data });
  } catch (e) {
    const message = e.response.data.message.message;
    yield put({ type: LOGIN_CHECK_FAILED, payload: message });
  }
}

function loginCheck() {
  axios.defaults.withCredentials = true;
  return axios.get(`${API_BASE}/isAuthenticated`)
}



