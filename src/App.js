import React from "react";
import ToDO from "./pages/todo";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import GoodsDetail from "./pages/goods/goodsDetails";
import Money from "./pages/money/money";
import Loading from "./components/Loading";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store";

const Index = React.lazy(() => import("./pages/index/index"));
const Cart = React.lazy(() => import("./pages/cart/cart"));
const Me = React.lazy(() => import("./pages/me/me"));
const CheckOut = React.lazy(() => import("./pages/checkout/checkout"));
const Contact = React.lazy(() => import("./pages/contact/Contact"));
const LazyIndex = (props) => (
  <React.Suspense fallback={<Loading/>}>
    <Index {...props}/>
  </React.Suspense>
);
const LazyCart = (props) => (
  <React.Suspense fallback={<Loading/>}>
    <Cart {...props}/>
  </React.Suspense>
);
const LazyMe = (props) => (
  <React.Suspense fallback={<Loading/>}>
    <Me {...props}/>
  </React.Suspense>
);
const LazyCheckOut = (props) => (
  <React.Suspense fallback={<Loading/>}>
    <CheckOut {...props}/>
  </React.Suspense>
);
const LazyContact = (props) => (
  <React.Suspense fallback={<Loading/>}>
    <Contact {...props}/>
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
            <Route path="/money" component={Money} />
            <Route path="/contact" component={LazyContact} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
