import React from "react";
import classNames from "classnames/bind";
import styles from "./UserMenu.scss";

const cx = classNames.bind(styles);

const UserMenu = ({ onLogout }) => {
  return (
    <div className={cx("user-menu")}>
      <div className={cx("menu-content")}>
        <div className={cx("thumbnail-wrapper")}>
          <img src="https://avatars.io/platform/userId" alt="pp" />
          <span>변경</span>
        </div>
        <div className={cx("info-wrapper")}>
          <div className={cx("username")}>Veloss</div>
          <div className={cx("email")}>public.veloss@naver.com</div>
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
