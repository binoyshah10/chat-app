import { LOGIN } from "../constants/actionTypes";

const initialState = {
  user: {},
  loggedIn: false
};

function rootReducer(state = initialState, action) {
  return state;
}

export default rootReducer;