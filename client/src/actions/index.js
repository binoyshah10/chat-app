import { LOGIN } from "../constants/actionTypes";

export const submitLogin = (payload) => {
  return { type: LOGIN, payload };
}

export const checkLoggedIn = () => {
  return { type: 'LOGIN_CHECK' }
}