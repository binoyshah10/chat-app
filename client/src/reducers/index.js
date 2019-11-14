import { LOGIN_SUCCESS, LOGIN_CHECK_SUCCESS, LOGIN_CHECK_FAILED } from "../constants/actionTypes";

const initialState = {
  user: {},
  loggedIn: false,
  loading: false,
  allTeams: [],
  selectedTeam: {}
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

  if (action.type === 'LOGIN_CHECK_LOADING') {
    return {...state, loading: true}
  }

  if (action.type === LOGIN_CHECK_FAILED) {
    return {...state, loading: false}
  }

  return state;
}

export default rootReducer;