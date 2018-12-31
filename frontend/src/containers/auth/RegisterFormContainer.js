import React, { Component } from "react";
import AuthForm from "../../components/auth/AuthForm";
import LabelInput from "../../components/auth/LabelInput";
import AlignedLink from "../../components/auth/AlignedLink";
import Button from "../../components/common/Button";

class RegisterFormContainer extends Component {
  render() {
    return (
      <AuthForm title="회원가입">
        <LabelInput
          label="이메일"
          name="email"
          value=""
          placeholder="이메일"
          onChange={() => console.log("dss")}
        />
        <LabelInput
          label="아이디"
          name="username"
          value=""
          placeholder="아이디"
          onChange={() => console.log("dss")}
        />
        <LabelInput
          label="비밀번호"
          name="password"
          value=""
          type="password"
          placeholder="비밀번호"
          onChange={() => console.log("dss")}
        />
        <LabelInput
          label="비밀번호 확인"
          name="passwordConfirm"
          value=""
          type="password"
          placeholder="비밀번호 확인"
          onChange={() => console.log("dss")}
        />
        <Button theme="auth">회원가입</Button>
        <AlignedLink to="/auth/login" text="이미 Locard 회원이신가요?">
          로그인
        </AlignedLink>
      </AuthForm>
    );
  }
}

export default RegisterFormContainer;
