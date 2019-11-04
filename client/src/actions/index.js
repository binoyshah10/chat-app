import { LOGIN } from "../constants/actionTypes";

export const submitLogin = (payload) => {
  return { type: LOGIN, payload };
}