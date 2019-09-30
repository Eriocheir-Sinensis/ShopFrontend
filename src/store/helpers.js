import store from "./index";

export const getToken = () => {
  let token = store.getState().auth.token;
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
