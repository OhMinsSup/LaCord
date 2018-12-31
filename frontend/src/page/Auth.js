import React from "react";
import { Route } from "react-router-dom";
import AuthTemplate from "../components/auth/AuthTemplate";
import LoginFormContainer from "../containers/auth/LoginFormContainer";
import RegisterFormContainer from "../containers/auth/RegisterFormContainer";

const Auth = () => (
  <AuthTemplate>
    <Route path="/auth/login" component={LoginFormContainer} />
    <Route path="/auth/register" component={RegisterFormContainer} />
  </AuthTemplate>
);

export default Auth;
