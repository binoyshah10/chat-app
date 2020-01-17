import { takeEvery, call, put } from "redux-saga/effects";
import axios from 'axios';
import { ADD_CHANNEL, ADD_CHANNEL_SUCCESS, ADD_CHANNEL_FAILED } from '../constants/actionTypes'
axios.defaults.withCredentials = true;

export default function* addChannelWatcherSaga() {
  yield takeEvery(ADD_CHANNEL, addChannelWorkerSaga);
}

function* addChannelWorkerSaga({ payload }) {
  try {
    //   console.log(payload)
    const response = yield call(addChannel, payload);
    // console.log(response) 
    yield put({ type: ADD_CHANNEL_SUCCESS, payload: response.data.payload });
  } catch (e) {
    console.log(e)
    yield put({ type: ADD_CHANNEL_FAILED, payload: e });
  }
}

function addChannel(payload) {
    console.log(payload)
    return axios.post('http://localhost:5000/addChannel', {
        channelName: payload.channelName,
        team: payload.team,
        user: payload.user
    })
}