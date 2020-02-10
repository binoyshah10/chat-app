import { takeEvery, call, put } from "redux-saga/effects";
import { GET_MESSAGES, GET_MESSAGES_SUCCESS, GET_MESSAGES_FAILED } from '../constants/actionTypes'
import axios from 'axios';
axios.defaults.withCredentials = true;

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

export default function* getMessagesWatcherSaga() {
  yield takeEvery(GET_MESSAGES, getMessagesWorkerSaga);
}

function* getMessagesWorkerSaga({ payload }) {
  try {
    // console.log(payload)
    let response = yield call(getMessages, payload);
    // console.log(response)
    yield put({ type: GET_MESSAGES_SUCCESS, payload: response.data});
  } catch (e) {
    console.log(e)
    yield put({ type: GET_MESSAGES_FAILED, payload: e });
  }
}

function getMessages(data) {
    return axios.post(`${API_BASE}/getMessages`, data);
}



