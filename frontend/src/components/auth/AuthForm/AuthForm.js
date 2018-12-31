import React from "react";
import classNames from "classnames/bind";
import styles from "./AuthForm.scss";

const cx = classNames.bind(styles);

const AuthForm = ({ children, title }) => {
  return (
    <div className={cx("auth-form")}>
      <div className={cx("title")}>{title}</div>
      {children}
    </div>
  );
};

export default AuthForm;
