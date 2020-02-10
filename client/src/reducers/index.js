import {  
  SIGN_UP_SUCCESS,
  LOGIN_SUCCESS, 
  LOGIN_CHECK_SUCCESS, 
  LOGIN_CHECK_FAILED, 
  LOGIN_CHECK_LOADING,
  GET_ALL_TEAMS_SUCCESS,
  SELECT_TEAM,
  GET_CHANNELS_SUCCESS,
  SELECT_CHANNEL,
  GET_MESSAGES_SUCCESS,
  ADD_TEAM_SUCCESS,
  RESET_ADD_TEAM,
  ADD_CHANNEL_SUCCESS,
  RESET_ADD_CHANNEL,
  SOCKET_MESSAGE_RECEIVED,
  ADD_USERS_TEAM_SUCCESS,
  ADD_USERS_TEAM_RESET,
  LOGOUT_SUCCESS,
} from "../constants/actionTypes";

const initialState = {
  user: {},
  loggedIn: false,
  loading: false,
  allTeams: [],
  selectedTeam: {},
  channelsForTeam: [],
  selectedChannel: {},
  messages: {},
  addTeam: {},
  addChannel: {},
  addUsersToTeamCompleted: false,
  loggedOut: false
};

function rootReducer(state = initialState, action) {

  if (action.type === SIGN_UP_SUCCESS) {
    return { ...state, user: action.payload.payload, loggedIn: true, loggedOut: false };
  }

  if (action.type === LOGIN_SUCCESS) {
    return { ...state, user: action.payload.payload, loggedIn: true, loggedOut: false };
  }

  if (action.type === LOGOUT_SUCCESS) {
    return { ...state, loggedIn: false, loggedOut: true  }
  }

  if (action.type === LOGIN_CHECK_SUCCESS) {
    return {
      ...state, 
      user: action.payload.payload,
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
    return {...state, allTeams: action.payload.payload}
  }

  if (action.type === SELECT_TEAM) {
    return {...state, selectedTeam: action.payload}
  }

  if (action.type === GET_CHANNELS_SUCCESS) {
    return {...state, channelsForTeam: action.payload.payload}
  }

  if (action.type === SELECT_CHANNEL) {
    return {...state, selectedChannel: action.payload}
  }

  if (action.type === GET_MESSAGES_SUCCESS) {
    const teamChannelName = action.payload.payload['teamChannelName']
    const messages = action.payload.payload['messages'].reverse()
    return { 
      ...state, 
      messages: {
        ...state.messages,
        [teamChannelName]: messages
      }
    }
  }

  if (action.type === SOCKET_MESSAGE_RECEIVED) {
    const { team, channel } = action.payload;
    const teamChannelName = `${team.name}-${channel.name}`;
    const messages = state.messages[teamChannelName];
    messages.push(action.payload)
    return {
      ...state,
      messages: {
        ...state.messages,
        [teamChannelName]: messages
      }
    }
  }

  if (action.type === ADD_TEAM_SUCCESS) {
    const { team, channel } = action.payload.payload;
    return {
      ...state, 
      addTeam: { team, channel }
    }
  }

  if (action.type === RESET_ADD_TEAM) {
    return {
      ...state, 
      addTeam: {}
    }
  }

  if (action.type === ADD_CHANNEL_SUCCESS) {
    const { channel } = action.payload.payload;
    return {
      ...state,
      addChannel: { channel }
    }
  }

  if (action.type === RESET_ADD_CHANNEL) {
    return {
      ...state, 
      addChannel: {}
    }
  }

  if (action.type === ADD_USERS_TEAM_SUCCESS) {
    return { ...state, addUsersToTeamCompleted: true }
  }

  if (action.type === ADD_USERS_TEAM_RESET) {
    return { ...state, addUsersToTeamCompleted: false }
  }

  return state;
}

export default rootReducer;