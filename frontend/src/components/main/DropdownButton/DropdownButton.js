import React from "react";
import classNames from "classnames/bind";
import styles from "./DropdownButton.scss";

const cx = classNames.bind(styles);

const DropdownButton = ({ icon, type, onMouseOver, name, onClick }) => (
  <label className={cx("dropdown-button")} onClick={onClick}>
    <li className={cx({ type })} onMouseOver={() => onMouseOver(name)}>
      {icon}
    </li>
  </label>
);

export default DropdownButton;
