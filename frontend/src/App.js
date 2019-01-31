import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { Home, Auth, Search } from "./page";
import ConvertModalContainer from "./containers/main/ConvertModalContainer";
import UrlModalContainer from "./containers/main/UrlModalContainer";
import Core from "./containers/base/Core";

const App = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/auth" component={Auth} />
        <Route path="/search" component={Search} />
      </Switch>
      <Core />
      <UrlModalContainer />
      <ConvertModalContainer />
    </Fragment>
  );
};

export default App;
