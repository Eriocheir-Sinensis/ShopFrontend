import axios from 'axios';
import { push, goBack } from 'connected-react-router'
import { getAuthHeaders } from '../helpers';
import store from "../index";
import { HOST } from '../../constants/backend';

const setCart = (data) => {
  return {
    type: 'SET_CART',
    ...data
  }
};

const createOrLogin = (err) => {
  return dispatch => {
    if (err.response.status === 404) {
      return axios.post(HOST + '/cart/', {}, { headers: getAuthHeaders()})
        .then((resp) => {
          dispatch(setCart(resp.data));
        })
    } else {
      dispatch(push('/login'));
    }
  }
};

export const getCartDetail = () => {
  return dispatch => {
    return axios.get(HOST + '/cart/', { headers: getAuthHeaders()})
      .then((resp) => {
        dispatch(setCart(resp.data))
      }).catch((err) => {
        if (err.response.status === 404) {
          return axios.post(HOST + '/cart/', {}, { headers: getAuthHeaders()})
            .then((resp) => {
              dispatch(setCart(resp.data));
            })
        }
      })
  }
};

export const addToCart = (item_id, amount) => {
  return dispatch => {
    const data = {
      crab: item_id,
      amount
    };
    return axios.post(`${HOST}/cart/${store.getState().cart.id}/`, data, { headers: getAuthHeaders()})
      .then((resp) => {
        dispatch(setCart(resp.data))
      }).catch((err) => {
        dispatch(createOrLogin(err));
      })
  }
};

export const updateCart = (item_id, amount) => {
  return dispatch => {
    return axios.put(`${HOST}/cart/${store.getState().cart.id}/${item_id}/`, { amount }, { headers: getAuthHeaders()})
      .then((resp) => {
        dispatch(setCart(resp.data))
      }).catch((err) => {
        dispatch(createOrLogin(err));
      })
  }
};

export const removeFromCart = (item_id) => {
  return dispatch => {
    return axios.delete(`${HOST}/cart/${store.getState().cart.id}/${item_id}`, { headers: getAuthHeaders()})
      .then((resp) => {
        dispatch(setCart(resp.data))
      }).catch((err) => {
        dispatch(createOrLogin(err));
      })
  }
};
