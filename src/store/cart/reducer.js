const initialState = {
  id: null,
  cart: {},
  items: [],
  count: 0,
  total: 0,
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CART":
      return Object.assign({}, state, {
        id: action.id,
        items: action.items,
        count: action.count,
        total: action.total,
      });
    case "ADD_TO_CART":
      if (state.cart[action.id] === undefined) {
        state.cart[action.id] = -1;
      }
      state.cart[action.id] += action.num;
      state.count += action.num;
      return Object.assign({}, state, {});
    case "REMOVE_FROM_CART":
      let amount;
      if (
        state.cart[action.id] === undefined ||
        state.cart[action.id] <= action.num
      ) {
        amount =
          state.cart[action.id] === undefined ? -1 : state.cart[action.id];
        state.cart[action.id] = -1;
      } else {
        amount = action.num;
        state.cart[action.id] -= action.num;
      }
      state.count -= amount;
      return Object.assign({}, state, {});
    default:
      return state;
  }
};

export default CartReducer;