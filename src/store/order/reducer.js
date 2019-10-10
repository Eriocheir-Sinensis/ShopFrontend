const initialState = {
  orders: null,
  current: null,
};

const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ORDERS":
      return Object.assign({}, state, {orders: action.data});
    case "SET_CURRENT_ORDER":
      return Object.assign({}, state, {current: action.data});
    default:
      return state;
  }
};

export default OrderReducer;
