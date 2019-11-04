import { LOGIN_SUCCESS } from "../constants/actionTypes";

const initialState = {
  user: {},
  loggedIn: false
};

function rootReducer(state = initialState, action) {

  if (action.type === LOGIN_SUCCESS) {
    return Object.assign({}, state, {
      user: action.payload,
      loggedIn: true
    });
  }

  return state;
}

export default rootReducer;