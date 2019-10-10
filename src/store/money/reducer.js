const initialState = {
  money: null
};

const MoneyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MONEY':
      return Object.assign({}, state, {money: action.data});
    default:
      return state
  }
};

export default MoneyReducer;
