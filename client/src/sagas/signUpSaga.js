import { takeEvery, call, put } from "redux-saga/effects";
import axios from 'axios';
import { SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAILED } from '../constants/actionTypes'

axios.defaults.withCredentials = true;

export default function* signUpWatcherSaga() {
  yield takeEvery(SIGN_UP, signUpWorkerSaga);
}

function* signUpWorkerSaga({ payload }) {
  try {
    const response = yield call(sendSignUpInfo, payload);
    console.log(response)
    yield put({ type: SIGN_UP_SUCCESS, payload: response.data.payload });
  } catch (e) {
    console.log(e)
    yield put({ type: SIGN_UP_FAILED, payload: e });
  }
}

function sendSignUpInfo(payload) {
  return axios.post('http://localhost:5000/signup', {
    firstName: payload['firstName'],
    lastName: payload['lastName'],
    email: payload['email'],
    username: payload['username'],
    password: payload['password'],
    confPassword: payload['confPassword']
  })
}

