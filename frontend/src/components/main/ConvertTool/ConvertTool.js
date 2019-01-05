import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./ConvertTool.scss";

const cx = classNames.bind(styles);

const ConvertTool = ({ boder, boder2, text, description, icon, to }) => {
  return (
    <div className={cx("convert-tool", { boder }, { boder2 })}>
      <div className={cx("card")}>
        <div className={cx("card-content")}>
          <Link to={to}>
            {icon}
            <b>{text}</b>
            <span>{description}</span>
          </Link>
        </div>
      </div>
      <div className={cx("hover")} />
    </div>
  );
};

export default ConvertTool;
