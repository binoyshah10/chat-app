import { takeEvery, call, put } from "redux-saga/effects";
import { GET_ALL_TEAMS, GET_ALL_TEAMS_SUCCESS, GET_ALL_TEAMS_FAILED } from '../constants/actionTypes'
import axios from 'axios';
axios.defaults.withCredentials = true;

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

export default function* getAllTeamsWatcherSaga() {
  yield takeEvery(GET_ALL_TEAMS, getAllTeamsWorkerSaga);
}

function*getAllTeamsWorkerSaga({ payload }) {
  try {
    // console.log(payload)
    let response = yield call(getAllTeams, payload);
    // console.log(response)
    yield put({ type: GET_ALL_TEAMS_SUCCESS, payload: response.data });
  } catch (e) {
    console.log(e)
    yield put({ type: GET_ALL_TEAMS_FAILED, payload: e });
  }
}

function getAllTeams(user) {
    return axios.post(`${API_BASE}/getAllTeams`, {
        id: user['id'],
        email: user['email'],
        username: user['username'],
        firstName: user['firstName'],
        lastName: user['lastName']
  })
}



