import React, { Component } from "react";
import ToDO from "./pages/todo";
import Index from "./pages/index/index";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
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
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
