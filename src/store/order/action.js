import axios from 'axios';
import { push, goBack } from 'connected-react-router'
import { getAuthHeaders } from '../helpers';
import { HOST } from '../../constants/backend';
import store from "../index";
import {showError} from "../errorbar/action";

const setOrders = (data) => {
  return {
    type: 'SET_ORDERS',
    data
  }
};

const setCurrentOrder = (data) => {
  return {
    type: 'SET_CURRENT_ORDER',
    data
  }
}


export const createOrder = (data) => {
  return dispatch => {
    return axios.post(`${HOST}/order/`, data, {headers: getAuthHeaders()})
      .then((resp) => {
        dispatch(push(`/money/?id=${resp.data.id}`))
      })
      .catch((err) => {
        if (err.hasOwnProperty('response')) {
          if (err.response.status === 403) {
            dispatch(push('/login'));
          } else {
            dispatch(showError(JSON.stringify(err.response.data)));
          }
        } else {
          console.log(err);
        }
      })
  }
};

export const getAllOrders = () => {
  return dispatch => {
    return axios.get(`${HOST}/order/`, {headers: getAuthHeaders()})
      .then((resp) => {
        dispatch(setOrders(resp.data));
      })
      .catch((err) => {
        if (err.hasOwnProperty('response')) {
          if (err.response.status === 403) {
            dispatch(push('/login'));
          } else {
            dispatch(showError(JSON.stringify(err.response.data)));
          }
        } else {
          console.log(err);
        }
      })
  }
};

export const getOrderDetails = (order_id) => {
  return dispatch => {
    return axios.get(`${HOST}/order/${order_id}/`, {headers: getAuthHeaders()})
      .then((resp) => {
        dispatch(setCurrentOrder(resp.data));
      })
      .catch((err) => {
        if (err.hasOwnProperty('response')) {
          if (err.response.status === 403) {
            dispatch(push('/login'));
          } else {
            dispatch(showError(JSON.stringify(err.response.data)));
          }
        } else {
          console.log(err);
        }
      })
  }
}

