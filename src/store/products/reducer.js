const initialState = {
  crabs: []
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CRAB_LIST":
      return Object.assign({}, state, { crabs: action.data })
    default:
      return state;
  }
};

export default ProductReducer;
