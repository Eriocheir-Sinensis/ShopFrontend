import { store } from "../App";

export const getToken = () => {
  let token = store.getState().user.token;
  if (!token || token.length === 0) {
    token = localStorage.getItem("token");
  }
  return token;
};

export const getAuthHeaders = () => {
  return {
    Authorization: "Token " + getToken()
  };
};