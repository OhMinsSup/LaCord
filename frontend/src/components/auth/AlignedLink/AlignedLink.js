import React from "react";
import classNames from "classnames/bind";
import styles from "./AlignedLink.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const AlignedLink = ({ to, children, text }) => {
  return (
    <div className={cx("aligner")}>
      {text && <span>{text}</span>}
      <Link to={to}>{children}</Link>
    </div>
  );
};

export default AlignedLink;
