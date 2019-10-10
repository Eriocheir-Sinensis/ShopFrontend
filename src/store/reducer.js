import ACTIONS from "./action";
import _ from "lodash";
import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import ProductReducer from './products/reducer';
import CartReducer from './cart/reducer';
import AuthReducer from './auth/reducer';
import ErrorBarReducer from "./errorbar/reducer";
import OrderReducer from "./order/reducer";
import MoneyReducer from "./money/reducer";

const defaultState = {
  items: []
};

const todoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.CREATE_ITEM: {
      console.log(action);

      let item = action.payload;
      let newItem = {id: state.items.length + 1, description: item};
      let newState = _.cloneDeep(state);
      newState.items.push(newItem);
      return newState;
    }

    case ACTIONS.Types.DELETE_ITEM: {
      let newState = _.cloneDeep(state);
      let index = _.findIndex(newState.items, {id: action.payload});
      newState.items.splice(index, 1);
      return newState;
    }

    default:
      return state;
  }
};

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  todoReducer: todoReducer,
  cart: CartReducer,
  products: ProductReducer,
  error: ErrorBarReducer,
  auth: AuthReducer,
  order: OrderReducer,
  money: MoneyReducer,
});
export default createRootReducer
