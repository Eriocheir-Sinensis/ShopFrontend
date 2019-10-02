import axios from "axios";
import { HOST } from "../../constants/backend";

const setCrabList = data => {
  return {
    type: "SET_CRAB_LIST",
    data
  };
};

const setCurrentGoods = data => {
  return {
    type: "SET_CURRENT_GOODS",
    data
  };
};

export const getCrabList = () => {
  return dispatch => {
    return axios
      .get(`${HOST}/goods/crab/`)
      .then(resp => {
        dispatch(setCrabList(resp.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const getCrabDetail = (crab_id) => {
  return dispatch => {
    return axios
      .get(`${HOST}/goods/crab/${crab_id}/`)
      .then(resp => {
        dispatch(setCurrentGoods(resp.data));
      })
      .catch(err => {
        if (err.response.status === 404) {
          dispatch(setCurrentGoods({}));
        }
        console.log(err);
      })
  }
};
