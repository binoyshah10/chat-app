import { takeEvery, call, put } from "redux-saga/effects";
import { LOGIN_CHECK_SUCCESS, LOGIN_CHECK_FAILED } from '../constants/actionTypes'
import axios from 'axios';
axios.defaults.withCredentials = true;

export default function* loginCheckWatcherSaga() {
  yield takeEvery("LOGIN_CHECK", loginCheckWorkerSaga);
}

function* loginCheckWorkerSaga() {
  try {
    yield put({ type: 'LOGIN_CHECK_LOADING', payload: {} });
    let response = yield call(loginCheck);
    console.log(response)
    yield put({ type: LOGIN_CHECK_SUCCESS, payload: response.data.payload });
  } catch (e) {
    console.log(e)
    yield put({ type: LOGIN_CHECK_FAILED, payload: e });
  }
}

function loginCheck() {
  axios.defaults.withCredentials = true;
  return axios.get('http://localhost:5000/isAuthenticated')
}



