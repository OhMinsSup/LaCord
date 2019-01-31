import React from "react";
import classNames from "classnames/bind";
import styles from "./UserMenu.scss";

const cx = classNames.bind(styles);

const UserMenu = ({ onLogout, user, onClick }) => {
  return (
    <div className={cx("user-menu")}>
      <div className={cx("rotated-square")} />
      <div className={cx("menu-content")}>
        <div className={cx("thumbnail-wrapper")}>
          <img
            src={
              user.thumbnail
                ? user.thumbnail
                : "https://avatars.io/platform/userId"
            }
            alt="pp"
          />
          <span onClick={onClick}>변경</span>
        </div>
        <div className={cx("info-wrapper")}>
          <div className={cx("username")}>{user.username}</div>
          <div className={cx("email")}>{user.email}</div>
          <div className={cx("info")}>
            <span>Lacord에서 원하는 파일로 바꿔보세요.</span>
          </div>
        </div>
      </div>
      <div className={cx("footer-wrapper")}>
        <div className={cx("unregister")}>
          <button className={cx("btn")}>회원 탈퇴</button>
        </div>
        <div className={cx("logout")}>
          <button className={cx("btn")} onClick={onLogout}>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
