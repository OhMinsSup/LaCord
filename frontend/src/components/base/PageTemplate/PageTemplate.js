import React from "react";
import classNames from "classnames/bind";
import styles from "./PageTemplate.scss";

const cx = classNames.bind(styles);

const PageTemplate = ({ children, header, none }) => (
  <div className={cx("page-template")}>
    {header && <header>{header}</header>}
    <main>
      <div className={cx("area")}>{children}</div>
    </main>
  </div>
);

export default PageTemplate;
