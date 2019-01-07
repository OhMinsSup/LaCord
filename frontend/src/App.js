import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { Home, Auth } from "./page";
import ConvertModalContainer from "./containers/main/ConvertModalContainer";
import UrlModalContainer from "./containers/main/UrlModalContainer";

const App = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/auth" component={Auth} />
      </Switch>
      <UrlModalContainer />
      <ConvertModalContainer />
    </Fragment>
  );
};

export default App;
