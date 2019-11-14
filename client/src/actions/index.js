import { 
  LOGIN, 
  LOGIN_CHECK, 
  SIGN_UP,
  GET_ALL_TEAMS,
  SELECT_TEAM
} from "../constants/actionTypes";

export const submitLogin = (payload) => {
  return { type: LOGIN, payload };
}

export const submitSignUp = (payload) => {
  return { type: SIGN_UP, payload };
}

export const checkLoggedIn = () => {
  return { type: LOGIN_CHECK }
}

export const getAllTeams = (payload) => {
  return { type: GET_ALL_TEAMS, payload }
}

export const selectTeam = (payload) => {
  return { type: SELECT_TEAM, payload }
}