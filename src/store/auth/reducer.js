
const userInitialState = {
  user: null,
  token: null
};

const AuthReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return Object.assign({}, state, {token: action.token});
    case 'SET_USER':
      return Object.assign({}, state, {user: action.user});
    default:
      return state;
  }
};

export default AuthReducer;
