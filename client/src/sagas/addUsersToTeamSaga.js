import { takeEvery, call, put } from "redux-saga/effects";
import axios from 'axios';
import { ADD_USERS_TEAM, ADD_USERS_TEAM_SUCCESS, ADD_USERS_TEAM_FAILED } from '../constants/actionTypes'
axios.defaults.withCredentials = true;

export default function* addUsersToTeamWatcherSaga() {
  yield takeEvery(ADD_USERS_TEAM, addUsersToTeamWorkerSaga);
}

function* addUsersToTeamWorkerSaga({ payload }) {
  try {
    const response = yield call(addUsersToTeam, payload);
    // console.log(response) 
    yield put({ type: ADD_USERS_TEAM_SUCCESS, payload: response.data });
  } catch (e) {
    console.log(e)
    yield put({ type: ADD_USERS_TEAM_FAILED, payload: e });
  }
}

function addUsersToTeam(payload) {
  return axios.post('http://localhost:5000/addUsersToTeam', {
      usersEmails: payload.users,
      teamInfo: payload.team
  });
}