import React from "react";
import classNames from "classnames/bind";
import styles from "./Header.scss";
import Button from "../../common/Button";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Logo = ({ children }) => (
  <Link to="/" className={cx("logo")}>
    {children}
  </Link>
);

const Header = ({ logged, user, menu, onClick }) => {
  return (
    <div className={cx("header")}>
      <div className={cx("inner")}>
        <div className={cx("wrapper")}>
          <Logo>Locard</Logo>
          <div className={cx("spacer")} />
          {logged ? (
            <button className={cx("login-wrapper")} onClick={onClick}>
              <img
                className={cx("thumbnail")}
                src={
                  !user.thumbnail
                    ? "https://avatars.io/platform/userId"
                    : user.thumbnail
                }
                alt="thumbnail"
              />
            </button>
          ) : (
            <Button theme="border" to="/auth/login">
              로그인 / 회원가입
            </Button>
          )}
          {menu}
        </div>
      </div>
      <div className={cx("gradient-border")} />
    </div>
  );
};

export default Header;
