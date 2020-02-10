import { takeEvery, call, put } from "redux-saga/effects";
import axios from 'axios';
import { SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAILED } from '../constants/actionTypes'
axios.defaults.withCredentials = true;

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

export default function* signUpWatcherSaga() {
  yield takeEvery(SIGN_UP, signUpWorkerSaga);
}

function* signUpWorkerSaga({ payload }) {
  try {
    const response = yield call(sendSignUpInfo, payload);
    console.log(response)
    yield put({ type: SIGN_UP_SUCCESS, payload: response.data });
    
  } catch (e) {
    console.log(e)
    yield put({ type: SIGN_UP_FAILED, payload: e });
  }
}

function sendSignUpInfo(payload) {
  return axios.post(`${API_BASE}/signup`, {
    firstName: payload['firstName'],
    lastName: payload['lastName'],
    email: payload['email'],
    username: payload['username'],
    password: payload['password'],
    confPassword: payload['confPassword'],
    teamName: payload['teamName'],
    joinNewTeam: payload['joinNewTeam']
  })
}

