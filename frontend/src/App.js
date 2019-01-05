import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { Home, Auth, Convert } from "./page";
import ConvertModalContainer from "./containers/main/ConvertModalContainer";

const App = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/auth" component={Auth} />
        <Route
          path="/convert/(font|video|audio|doc|image|youtube)"
          component={Convert}
        />
      </Switch>
      <ConvertModalContainer />
    </Fragment>
  );
};

export default App;
