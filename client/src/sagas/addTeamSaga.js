import { takeEvery, call, put } from "redux-saga/effects";
import axios from 'axios';
import { ADD_TEAM, ADD_TEAM_SUCCESS, ADD_TEAM_FAILED } from '../constants/actionTypes'
axios.defaults.withCredentials = true;

export default function* addTeamWatcherSaga() {
  yield takeEvery(ADD_TEAM, addTeamWorkerSaga);
}

function* addTeamWorkerSaga({ payload }) {
  try {
    const response = yield call(addTeam, payload);
    console.log(response) 
    yield put({ type: ADD_TEAM_SUCCESS, payload: response.data.payload });
  } catch (e) {
    console.log(e)
    yield put({ type: ADD_TEAM_FAILED, payload: e });
  }
}

function addTeam(payload) {
  return axios.post('http://localhost:5000/addTeam', {
    teamName: payload.teamName,
    user: payload.user
  })
}