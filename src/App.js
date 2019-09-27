import React, { Component } from "react";
import ToDO from "./pages/todo";
import Index from "./pages/index/index";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router"; // react-router v4/v5
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./store/index";

const store = configureStore(/* provide initial state if any */);

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
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
