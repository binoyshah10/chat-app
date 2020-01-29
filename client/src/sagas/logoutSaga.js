import { takeEvery, call, put } from "redux-saga/effects";
import { LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILED } from '../constants/actionTypes'
import axios from 'axios';
axios.defaults.withCredentials = true;

export default function* logoutSaga() {
  yield takeEvery(LOGOUT, logoutWorkerSaga);
}

function* logoutWorkerSaga() {
  try {
    let response = yield call(logout);
    console.log(response)
    yield put({ type: LOGOUT_SUCCESS, payload: response.data.payload });
  } catch (e) {
    console.log(e)
    yield put({ type: LOGOUT_FAILED, payload: e });
  }
}

function logout() {
    return axios.get('http://localhost:5000/logout')
}



