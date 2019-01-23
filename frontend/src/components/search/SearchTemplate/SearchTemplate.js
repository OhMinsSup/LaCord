import React from "react";
import className from "classnames/bind";
import styles from "./SearchTemplate.scss";

const cx = className.bind(styles);

const SearchTemplate = ({ children, searchBar }) => {
  return (
    <div className={cx("search-template")}>
      <div className={cx("search-bar-area")}>{searchBar}</div>
      <div className={cx("contents")}>{children}</div>
    </div>
  );
};

export default SearchTemplate;
