const initialState = {
  open: false,
  msg: ''
};

const ErrorBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ERROR_MSG':
      return Object.assign({}, state, {open: true, msg: action.msg});
    case 'SET_NO_SHOW':
      return Object.assign({}, state, {open: false})
    default:
      return state
  }
};

export default ErrorBarReducer;
