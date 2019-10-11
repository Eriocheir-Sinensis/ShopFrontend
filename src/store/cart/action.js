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

const setBadgeVariant = (variant='standard') => {
  return {
    type: 'SET_BADGE_VARIANT',
    variant
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

export const getCartDetail = (detailed=false, redirectLogin=false) => {
  return dispatch => {
    return axios.get(`${HOST}/cart/${detailed ? '?detail=true' : ''}`, { headers: getAuthHeaders()})
      .then((resp) => {
        dispatch(setCart(resp.data))
      }).catch((err) => {
        console.log(err, err.response);
        if (err.hasOwnProperty('response')) {
          if (err.response.status === 403) {
            dispatch(setCart({id: null, count: 0, total: 0, items: []}));
            if (redirectLogin) dispatch(push('/login'));
          } else if (err.response.status === 404) {
            return axios.post(HOST + '/cart/', {}, { headers: getAuthHeaders()})
              .then((resp) => {
                dispatch(setCart(resp.data));
              })
          } else {
            dispatch(setCart({id: null, count: 0, total: 0, items: []}));
          }
        }
      })
  }
};

export const addToCart = (item_id, amount) => {
  return dispatch => {
    dispatch(setBadgeVariant('dot'));
    const data = {
      crab: item_id,
      amount
    };
    return axios.post(`${HOST}/cart/${store.getState().cart.id}/`, data, { headers: getAuthHeaders()})
      .then((resp) => {
        dispatch(setCart(resp.data));
        setTimeout(() => {
          dispatch(setBadgeVariant());
        }, 200)
      }).catch((err) => {
        dispatch(createOrLogin(err));
        setTimeout(() => {
          dispatch(setBadgeVariant());
        }, 200)
      })
  }
};

export const updateCart = (item_id, amount, detailed=false) => {
  return dispatch => {
    dispatch(setBadgeVariant('dot'));
    return axios.put(`${HOST}/cart/${store.getState().cart.id}/${item_id}/${detailed ? '?detail=true' : ''}`, { amount }, { headers: getAuthHeaders()})
      .then((resp) => {
        dispatch(setCart(resp.data));
        setTimeout(() => {
          dispatch(setBadgeVariant());
        }, 200)
      }).catch((err) => {
        dispatch(createOrLogin(err));
        setTimeout(() => {
          dispatch(setBadgeVariant());
        }, 200)
      })
  }
};

export const removeFromCart = (item_id, detailed=false) => {
  return dispatch => {
    return axios.delete(`${HOST}/cart/${store.getState().cart.id}/${item_id}/${detailed ? '?detail=true' : ''}`, { headers: getAuthHeaders()})
      .then((resp) => {
        dispatch(setCart(resp.data))
      }).catch((err) => {
        dispatch(createOrLogin(err));
      })
  }
};
