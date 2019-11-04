import { LOGIN } from "../constants/actionTypes";

export const submitLogin = (payload) => {
  return { type: LOGIN, payload };
}

export function getData() {
  return { type: "DATA_REQUESTED" };
}

