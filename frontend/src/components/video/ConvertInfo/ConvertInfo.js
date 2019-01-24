import React from "react";
import classNames from "classnames/bind";
import styles from "./ConvertInfo.scss";

import Button from "../../common/Button";

const cx = classNames.bind(styles);

const ConvertInfo = ({ type, resolution, size }) => (
  <div className={cx("convert-info")}>
    <ul className={cx("info-wrapper")}>
      <li className={cx("info-item")}>
        <span>
          <div className={cx("text")}>{type}</div>
        </span>
      </li>
      <li className={cx("info-item")}>
        <span>
          <div className={cx("text")}>{resolution}</div>
        </span>
      </li>
      <li className={cx("info-item")}>
        <span>
          <div className={cx("text")}>{size}</div>
        </span>
      </li>
      <li className={cx("info-item")}>
        <Button>다운로드</Button>
      </li>
    </ul>
  </div>
);

export default ConvertInfo;
