import React, { Component } from "react";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

import * as authActions from "../../store/modules/auth";
import * as userActions from "../../store/modules/user";

import AuthForm from "../../components/auth/AuthForm";
import LabelInput from "../../components/auth/LabelInput";
import AlignedLink from "../../components/auth/AlignedLink";
import Button from "../../components/common/Button";
import storage from "../../lib/storage";
import AuthError from "../../components/auth/AuthError";

class LoginFormContainer extends Component {
  onChange = e => {
    const { AuthActions } = this.props;
    const { value, name } = e.target;

    AuthActions.changeInput({
      form: "login_form",
      name,
      value
    });
  };

  setError = message => {
    const { AuthActions } = this.props;
    AuthActions.setError({
      form: "login_form",
      name: "error",
      message
    });
  };

  componentWillUnmount() {
    const { AuthActions } = this.props;
    AuthActions.initialize();
  }

  componentDidMount() {
    const { location } = this.props;
    const query = queryString.parse(location.search);

    if (query.expired !== undefined) {
      this.setError("세션에 만료되었습니다. 다시 로그인하세요.");
    }
  }

  onLogin = async () => {
    const {
      loginForm: { email, password },
      history,
      AuthActions,
      UserActions
    } = this.props;

    try {
      await AuthActions.login({ email, password });

      const { authResult } = this.props;

      storage.set("__Lacord__", authResult);
      UserActions.setUser(authResult);
      history.push("/");
    } catch (e) {
      this.setError("잘못된 계정정보입니다.");
    }
  };

  render() {
    const {
      loginForm: { email, password, error }
    } = this.props;
    return (
      <AuthForm title="로그인">
        <LabelInput
          label="이메일"
          name="email"
          value={email}
          placeholder="이메일"
          onChange={this.onChange}
        />
        <LabelInput
          label="비밀번호"
          name="password"
          value={password}
          type="password"
          placeholder="비밀번호"
          onChange={this.onChange}
        />
        {error && <AuthError>{error}</AuthError>}
        <Button theme="auth" onClick={this.onLogin}>
          로그인
        </Button>
        <AlignedLink to="/auth/register" text="Locard에 처음이신가요?">
          회원가입
        </AlignedLink>
      </AuthForm>
    );
  }
}

const enhance = compose(
  withRouter,
  connect(
    ({ auth }) => ({
      loginForm: auth.login_form,
      authResult: auth.authResult
    }),
    dispatch => ({
      UserActions: bindActionCreators(userActions, dispatch),
      AuthActions: bindActionCreators(authActions, dispatch)
    })
  )
);

export default enhance(LoginFormContainer);
