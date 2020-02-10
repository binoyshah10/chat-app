import { takeEvery, call, put } from "redux-saga/effects";
import { LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILED } from '../constants/actionTypes'
import axios from 'axios';
axios.defaults.withCredentials = true;

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

export default function* logoutSaga() {
  yield takeEvery(LOGOUT, logoutWorkerSaga);
}

function* logoutWorkerSaga() {
  try {
    let response = yield call(logout);
    console.log(response)
    yield put({ type: LOGOUT_SUCCESS, payload: response.data });
  } catch (e) {
    console.log(e)
    yield put({ type: LOGOUT_FAILED, payload: e });
  }
}

function logout() {
    return axios.get(`${API_BASE}/logout`)
}



