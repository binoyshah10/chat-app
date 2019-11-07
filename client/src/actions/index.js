import { LOGIN, LOGIN_CHECK, SIGN_UP } from "../constants/actionTypes";

export const submitLogin = (payload) => {
  return { type: LOGIN, payload };
}

export const submitSignUp = (payload) => {
  return { type: SIGN_UP, payload };
}

export const checkLoggedIn = () => {
  return { type: LOGIN_CHECK }
}