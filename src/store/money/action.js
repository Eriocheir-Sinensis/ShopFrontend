import axios from 'axios';
import { push, goBack } from 'connected-react-router'
import { getAuthHeaders } from '../helpers';
import { HOST } from '../../constants/backend';
import store from "../index";
import {showError} from "../errorbar/action";


const setMoney = (data) => {
  return {
    type: 'SET_MONEY',
    data
  }
};

export const getMoney = () => {
  return dispatch => {
    return axios.get(`${HOST}/money/`)
      .then((resp) => {
        dispatch(setMoney(resp.data))
      })
      .catch((err) => {
        if (err.response) {
          showError(JSON.stringify(err.response.data));
        } else {
          console.log(err);
        }
      })
  }
};

