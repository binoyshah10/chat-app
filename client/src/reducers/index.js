import {  
  LOGIN_SUCCESS, 
  LOGIN_CHECK_SUCCESS, 
  LOGIN_CHECK_FAILED, 
  LOGIN_CHECK_LOADING,
  GET_ALL_TEAMS_SUCCESS,
  SELECT_TEAM,
  GET_CHANNELS_SUCCESS
} from "../constants/actionTypes";

const initialState = {
  user: {},
  loggedIn: false,
  loading: false,
  allTeams: [],
  selectedTeam: {},
  channelsForTeam: []
};

function rootReducer(state = initialState, action) {

  if (action.type === LOGIN_SUCCESS) {
    return { ...state, user: action.payload, loggedIn: true};
  }

  if (action.type === LOGIN_CHECK_SUCCESS) {
    return {
      ...state, 
      user: action.payload,
      loggedIn: true,
      loading: false
     }
  }

  if (action.type === LOGIN_CHECK_LOADING) {
    return {...state, loading: true}
  }

  if (action.type === LOGIN_CHECK_FAILED) {
    return {...state, loading: false}
  }

  if (action.type === GET_ALL_TEAMS_SUCCESS) {
    return {...state, allTeams: action.payload}
  }

  if (action.type === SELECT_TEAM) {
    return {...state, selectedTeam: action.payload}
  }

  if (action.type === GET_CHANNELS_SUCCESS) {
    return {...state, channelsForTeam: action.payload}
  }

  return state;
}

export default rootReducer;