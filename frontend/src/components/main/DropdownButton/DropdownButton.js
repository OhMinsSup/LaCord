import React from "react";
import classNames from "classnames/bind";
import styles from "./DropdownButton.scss";

const cx = classNames.bind(styles);

const DropdownButton = ({ icon }) => (
  <label className={cx("dropdown-button")}>
    <li>{icon}</li>
  </label>
);

export default DropdownButton;
