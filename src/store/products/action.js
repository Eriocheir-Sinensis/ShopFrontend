import axios from "axios";
import { HOST } from "../../constants/backend";

const setCrabList = data => {
  return {
    type: "SET_CRAB_LIST",
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
        console.log(err.response.data);
      });
  };
};
