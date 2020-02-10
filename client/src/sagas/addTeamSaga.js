import { takeEvery, call, put } from "redux-saga/effects";
import axios from 'axios';
import { ADD_TEAM, ADD_TEAM_SUCCESS, ADD_TEAM_FAILED } from '../constants/actionTypes'
import { toast } from 'react-toastify';
axios.defaults.withCredentials = true;

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

export default function* addTeamWatcherSaga() {
  yield takeEvery(ADD_TEAM, addTeamWorkerSaga);
}

function* addTeamWorkerSaga({ payload }) {
  try {
    const response = yield call(addTeam, payload);
    toast.success('Team created succesfully', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
  }); 
    yield put({ type: ADD_TEAM_SUCCESS, payload: response.data });
  } catch (e) {
    console.log(e)
    yield put({ type: ADD_TEAM_FAILED, payload: e });
  }
}

function addTeam(payload) {
  return axios.post(`${API_BASE}/addTeam`, {
    teamName: payload.teamName,
    user: payload.user
  })
}