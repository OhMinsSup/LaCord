import React from "react";
import classNames from "classnames/bind";
import styles from "./AuthTemplate.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const AuthTemplate = ({ children }) => (
  <div className={cx("auth-template")}>
    <div className={cx("logo-wrapper")}>
      <Link to="/" className={cx("logo")}>
        Locard
      </Link>
    </div>
    <div className={cx("wrapper")}>{children}</div>
  </div>
);

export default AuthTemplate;
