import axios from "axios";
import { push, goBack } from "connected-react-router";
import { showError } from "../errorbar/action";
import { getAuthHeaders } from "../helpers";
import { HOST } from "../../constants/backend";

function setToken(token) {
  return {
    type: "SET_TOKEN",
    token
  };
}

function setUser(user) {
  return {
    type: "SET_USER",
    user
  };
}

export const registerAccount = data => {
  return dispatch => {
    return axios
      .post(HOST + "/customer/register", data)
      .then(resp => {
        localStorage.setItem("token", resp.data.token);
        dispatch(setToken(resp.data.token));
        dispatch(setUser(resp.data.user));
        // TODO dispatch to previous page
      })
      .catch(err => {
        console.log(err.response);
        dispatch(showError(JSON.stringify(err.response.data)));
      });
  };
};

export const loginAccount = data => {
  return dispatch => {
    return axios
      .post(HOST + "/customer/login", data)
      .then(resp => {
        localStorage.setItem("token", resp.data.token);
        dispatch(setToken(resp.data.token));
        dispatch(setUser(resp.data.user));
        dispatch(push("/"));
      })
      .catch(err => {
        if (err.response.status === 404) {
          dispatch(showError("用户不存在"));
        } else {
          dispatch(showError("用户名或者密码错误"));
        }
      });
  };
};

export const logOutAccount = () => {
  return dispatch => {
    return axios
      .get(`${HOST}/customer/logout`, { headers: getAuthHeaders() })
      .then(_ => {
        localStorage.setItem("token", null);
        dispatch(push("/"));
      })
      .catch(err => {
        console.log(err);
        dispatch(push("/"));
      });
  };
};

export const getAccountInfo = (route = null) => {
  return dispatch => {
    return axios
      .get(HOST + "/customer/me", { headers: getAuthHeaders() })
      .then(resp => {
        dispatch(setUser(resp.data));
        if (route) {
          dispatch(push(route));
        }
      })
      .catch(err => {
        dispatch(push("/login"));
      });
  };
};
