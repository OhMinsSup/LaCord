import React from "react";
import classNames from "classnames/bind";
import styles from "./AuthError.scss";

const cx = classNames.bind(styles);

const AuthError = ({ children }) => (
  <div className={cx("auth-error")}>{children}</div>
);

export default AuthError;
