const initialState = {
  crabs: [],
  current: null
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CRAB_LIST":
      return Object.assign({}, state, { crabs: action.data });
    case "SET_CURRENT_GOODS":
      return Object.assign({}, state, { current: {amount: 1, ...action.data} });
    case "SET_CURRENT_AMOUNT":
      return Object.assign({}, state, {current: {...state.current, amount: action.amount}});
    default:
      return state;
  }
};

export default ProductReducer;
