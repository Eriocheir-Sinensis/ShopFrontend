
const setErrorMsg = (msg) => {
  return {
    type: 'SET_ERROR_MSG',
    msg
  }
};

const setNoShow = () => {
  return {
    type: 'SET_NO_SHOW'
  }
};

export const showError = (msg) => {
  return dispatch => {
    dispatch(setErrorMsg(msg));
  }
};

export const showNothing = () => {
  return dispatch => dispatch(setNoShow())
};
