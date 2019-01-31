import React, { Component } from "react";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { isEmail, isLength, isAlphanumeric } from "validator";
import debounce from "lodash/debounce";
import { withRouter } from "react-router-dom";

import * as authActions from "../../store/modules/auth";
import * as userActions from "../../store/modules/user";

import AuthForm from "../../components/auth/AuthForm";
import LabelInput from "../../components/auth/LabelInput";
import AlignedLink from "../../components/auth/AlignedLink";
import Button from "../../components/common/Button";
import storage from "../../lib/storage";
import AuthError from "../../components/auth/AuthError";

class RegisterFormContainer extends Component {
  onValidate = {
    email: value => {
      if (!isEmail(value)) {
        this.setError("잘못된 이메일 형식 입니다.");
        return false;
      }
      this.setError(null);
      return true;
    },
    username: value => {
      if (!isAlphanumeric(value) || !isLength(value, { min: 4, max: 15 })) {
        this.setError(
          "아이디는 4~15 글자의 알파벳 혹은 숫자로 이뤄져야 합니다."
        );
        return false;
      }
      this.setError(null);
      return true;
    },
    password: value => {
      if (!isLength(value, { min: 6 })) {
        this.setError("비밀번호를 6자 이상 입력하세요.");
        return false;
      }
      this.setError(null);
      return true;
    },
    passwordConfirm: value => {
      if (this.props.registerForm.password !== value) {
        this.setError("비밀번호확인이 일치하지 않습니다.");
        return false;
      }
      this.setError(null);
      return true;
    }
  };

  checkEmailExists = debounce(async email => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.checkEmailExists(email);
      if (this.props.exists.get("email")) {
        this.setError("이미 존재하는 이메일입니다.");
      } else {
        this.setError(null);
      }
    } catch (e) {
      console.log(e);
    }
  }, 300);

  checkUsernameExists = debounce(async username => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.checkUsernameExists(username);
      if (this.props.exists.get("username")) {
        this.setError("이미 존재하는 아이디입니다.");
      } else {
        this.setError(null);
      }
    } catch (e) {
      console.log(e);
    }
  }, 300);

  setError = message => {
    const { AuthActions } = this.props;

    AuthActions.setError({
      form: "register_form",
      name: "error",
      message
    });
  };

  onChange = e => {
    const { AuthActions } = this.props;
    const { value, name } = e.target;

    AuthActions.changeInput({
      form: "register_form",
      name,
      value
    });

    const validation = this.onValidate[name](value);

    if (name.indexOf("password") > -1 || !validation) return;

    if (name === "username") {
      AuthActions.checkUsernameExists({ key: name, value });
    } else if (name === "email") {
      AuthActions.checkEmailExists({ key: name, value });
    }
  };

  onRegister = async () => {
    console.log(this.props.registerForm);

    const {
      registerForm: { username, email, password, passwordConfirm, error },
      AuthActions,
      UserActions
    } = this.props;

    if (error) return;
    if (
      !this.onValidate["email"](email) ||
      !this.onValidate["username"](username) ||
      !this.onValidate["password"](password) ||
      !this.onValidate["passwordConfirm"](passwordConfirm)
    )
      return;

    try {
      await AuthActions.register({ email, username, password });

      const { authResult, history } = this.props;

      storage.set("__Lacord__", authResult);
      UserActions.setUser(authResult);
      history.push("/");
    } catch (e) {
      if (e.response.status === 409) {
        const { key } = e.response.data;
        const message =
          key === "email"
            ? "이미 존재하는 이메일입니다."
            : "이미 존재하는 아이디입니다.";
        return this.setError(message);
      }
      this.setError("알 수 없는 에러가 발생했습니다.");
    }
  };

  render() {
    const {
      registerForm: { username, email, password, passwordConfirm, error }
    } = this.props;
    return (
      <AuthForm title="회원가입">
        <LabelInput
          label="이메일"
          name="email"
          value={email}
          placeholder="이메일"
          onChange={this.onChange}
        />
        <LabelInput
          label="아이디"
          name="username"
          value={username}
          placeholder="아이디"
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
        <LabelInput
          label="비밀번호 확인"
          name="passwordConfirm"
          value={passwordConfirm}
          type="password"
          placeholder="비밀번호 확인"
          onChange={this.onChange}
        />
        {error && <AuthError>{error}</AuthError>}
        <Button theme="auth" onClick={this.onRegister}>
          회원가입
        </Button>
        <AlignedLink to="/auth/login" text="이미 Locard 회원이신가요?">
          로그인
        </AlignedLink>
      </AuthForm>
    );
  }
}

const enhance = compose(
  withRouter,
  connect(
    ({ auth }) => ({
      registerForm: auth.register_form,
      authResult: auth.authResult
    }),
    dispatch => ({
      UserActions: bindActionCreators(userActions, dispatch),
      AuthActions: bindActionCreators(authActions, dispatch)
    })
  )
);

export default enhance(RegisterFormContainer);
