import { takeEvery, call, put } from "redux-saga/effects";
import axios from 'axios';
import { ADD_CHANNEL, ADD_CHANNEL_SUCCESS, ADD_CHANNEL_FAILED } from '../constants/actionTypes';
import { toast } from 'react-toastify';
axios.defaults.withCredentials = true;

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

export default function* addChannelWatcherSaga() {
  yield takeEvery(ADD_CHANNEL, addChannelWorkerSaga);
}

function* addChannelWorkerSaga({ payload }) {
  try {
    //   console.log(payload)
    const response = yield call(addChannel, payload);
    toast.success('Channel created succesfully', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
  }); 
    yield put({ type: ADD_CHANNEL_SUCCESS, payload: response.data });
  } catch (e) {
    console.log(e)
    yield put({ type: ADD_CHANNEL_FAILED, payload: e });
  }
}

function addChannel(payload) {
    console.log(payload)
    return axios.post(`${API_BASE}/addChannel`, {
        channelName: payload.channelName,
        team: payload.team,
        user: payload.user
    })
}