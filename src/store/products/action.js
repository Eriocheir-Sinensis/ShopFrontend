import axios from "axios";
import { HOST } from "../../constants/backend";
import store from "../index";
import { addToCart } from "../cart/action";

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

const setAmount = amount => {
  return {
    type: "SET_CURRENT_AMOUNT",
    amount
  }
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
        console.log(err);
        if (err.response.status === 404) {
          dispatch(setCurrentGoods({}));
        }
        console.log(err);
      })
  }
};

export const setCurrentAmount = (amount) => {
  return dispatch => {
    if (amount > 0) dispatch(setAmount(amount));
    else dispatch(setAmount(1));
  }
};

export const addCurrentToCart = () => {
  return dispatch => {
    if (store.getState().products.current) {
      const { id, amount } = store.getState().products.current;
      dispatch(addToCart(id, amount));
      dispatch(setAmount(1));
    }
  }
};
