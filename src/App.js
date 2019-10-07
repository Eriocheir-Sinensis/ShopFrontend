import React, { Component } from "react";
import ToDO from "./pages/todo";
import Index from "./pages/index/index";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import GoodsDetail from "./pages/goods/goodsDetails";
import Cart from "./pages/cart/cart";
import Me from "./pages/me/me";
import CheckOut from "./pages/checkout/checkout";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store";


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/todo" component={ToDO} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/me" component={Me} />
            <Route path="/goods" component={GoodsDetail} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={CheckOut} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
