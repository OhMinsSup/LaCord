import React from "react";
import classNames from "classnames/bind";
import styles from "./Header.scss";
import Button from "../../common/Button";

const cx = classNames.bind(styles);

const Logo = ({ children }) => <div className={cx("logo")}>{children}</div>;

const Header = () => {
  return (
    <div className={cx("header")}>
      <div className={cx("inner")}>
        <div className={cx("wrapper")}>
          <Logo>Locard</Logo>
          <div className={cx("spacer")} />
          <Button theme="border" to="/auth/login">
            로그인 / 회원가입
          </Button>
        </div>
      </div>
      <div className={cx("gradient-border")} />
    </div>
  );
};

export default Header;
