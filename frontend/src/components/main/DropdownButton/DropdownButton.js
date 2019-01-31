import React from "react";
import classNames from "classnames/bind";
import styles from "./DropdownButton.scss";

import Tooltip from "react-tooltip";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const DropdownButton = ({
  icon,
  type,
  onMouseOver,
  name,
  onClick,
  to,
  logged
}) => {
  if (to) {
    return (
      <Link
        className={cx("dropdown-button")}
        to={logged ? to : "/"}
        {...(logged ? {} : { "data-tip": "로그인 후 이용해주세요." })}
      >
        <li
          className={cx({ type })}
          id={name}
          onMouseOver={() => onMouseOver(name)}
        >
          {icon}
        </li>
        <Tooltip effect="solid" className="tooltip" />
      </Link>
    );
  }

  return (
    <label className={cx("dropdown-button")} onClick={onClick}>
      <li
        className={cx({ type })}
        id={name}
        onMouseOver={() => onMouseOver(name)}
      >
        {icon}
      </li>
    </label>
  );
};

export default DropdownButton;
