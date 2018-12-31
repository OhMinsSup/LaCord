import React, { Component } from "react";
import AuthForm from "../../components/auth/AuthForm";
import LabelInput from "../../components/auth/LabelInput";
import AlignedLink from "../../components/auth/AlignedLink";
import Button from "../../components/common/Button";

class LoginFormContainer extends Component {
  render() {
    return (
      <AuthForm title="로그인">
        <LabelInput label="이메일" name="email" value="" placeholder="이메일" />
        <LabelInput
          label="비밀번호"
          name="password"
          value=""
          type="password"
          placeholder="비밀번호"
        />
        <Button theme="auth">로그인</Button>
        <AlignedLink to="/auth/register" text="Locard에 처음이신가요?">
          회원가입
        </AlignedLink>
      </AuthForm>
    );
  }
}

export default LoginFormContainer;
