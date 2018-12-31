// @flow
import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { Home, Auth } from "./page";

const App = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/auth" component={Auth} />
      </Switch>
    </Fragment>
  );
};

export default App;
