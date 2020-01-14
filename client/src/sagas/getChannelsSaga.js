import { takeEvery, call, put } from "redux-saga/effects";
import { GET_CHANNELS, GET_CHANNELS_SUCCESS, GET_CHANNELS_FAILED } from '../constants/actionTypes'
import axios from 'axios';
axios.defaults.withCredentials = true;

export default function* getChannelsWatcherSaga() {
  yield takeEvery(GET_CHANNELS, getChannelsWorkerSaga);
}

function*getChannelsWorkerSaga({ payload }) {
  try {
    // console.log(payload)
    let response = yield call(getChannels, payload);
    // console.log(response)
    yield put({ type: GET_CHANNELS_SUCCESS, payload: response.data.payload });
  } catch (e) {
    console.log(e)
    yield put({ type: GET_CHANNELS_FAILED, payload: e });
  }
}

function getChannels(team) {
    return axios.post('http://localhost:5000/getChannels', {
        teamId: team['id'],
        teamName: team['name'],
  })
}



