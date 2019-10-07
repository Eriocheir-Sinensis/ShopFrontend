import React from "react";
import ToDO from "./pages/todo";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import GoodsDetail from "./pages/goods/goodsDetails";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store";

const Index = React.lazy(() => import("./pages/index/index"));
const Cart = React.lazy(() => import("./pages/cart/cart"));
const Me = React.lazy(() => import("./pages/me/me"));
const CheckOut = React.lazy(() => import("./pages/checkout/checkout"));
const LazyIndex = (props) => (
  <React.Suspense fallback={<div>加载中</div>}>
    <Index {...props}/>
  </React.Suspense>
);
const LazyCart = (props) => (
  <React.Suspense fallback={<div>加载中</div>}>
    <Cart {...props}/>
  </React.Suspense>
);
const LazyMe = (props) => (
  <React.Suspense fallback={<div>加载中</div>}>
    <Me {...props}/>
  </React.Suspense>
);
const LazyCheckOut = (props) => (
  <React.Suspense fallback={<div>加载中</div>}>
    <CheckOut {...props}/>
  </React.Suspense>
);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/" component={LazyIndex} />
            <Route path="/todo" component={ToDO} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/me" component={LazyMe} />
            <Route path="/goods" component={GoodsDetail} />
            <Route path="/cart" component={LazyCart} />
            <Route path="/checkout" component={LazyCheckOut} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;