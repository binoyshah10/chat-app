import { 
  LOGIN, 
  LOGIN_CHECK, 
  SIGN_UP,
  GET_ALL_TEAMS,
  SELECT_TEAM,
  GET_CHANNELS,
  SELECT_CHANNEL,
  GET_MESSAGES,
  ADD_TEAM,
  RESET_ADD_TEAM,
  ADD_CHANNEL,
  RESET_ADD_CHANNEL
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

export const getChannels = (payload) => {
  return { type: GET_CHANNELS, payload }
}

export const selectChannel = (payload) => {
  return { type: SELECT_CHANNEL, payload }
}

export const connectSocket = () => {
  return { type: 'SOCKET_CONNECT' }
}

export const disconnectSocket = () => {
  return { type: 'SOCKET_DISCONNECT' }
}

export const sendSocketMessage = (payload) => {
  return { type: 'SEND_SOCKET_MESSAGE', payload }
}

export const getMessages = (payload) => {
  return { type: GET_MESSAGES, payload }
}

export const addTeam = (payload) => {
  return { type: ADD_TEAM, payload }
}

export const resetAddTeam = () => {
  return { type: RESET_ADD_TEAM }
}

export const addChannel = (payload) => {
  return { type: ADD_CHANNEL, payload }
}

export const resetAddChannel = () => {
  return { type: RESET_ADD_CHANNEL }
}