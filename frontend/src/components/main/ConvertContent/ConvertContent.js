import React from "react";
import classNames from "classnames/bind";
import styles from "./ConvertContent.scss";
import { FaGoogleDrive, FaDropbox, FaLink, FaLaptop } from "react-icons/fa";
import DropdownButton from "../DropdownButton/DropdownButton";

const cx = classNames.bind(styles);

const ConvertContent = () => {
  return (
    <div className={cx("convert-content")}>
      <h1>파일 변환기</h1>
      <div className={cx("container")}>
        <div className={cx("file-source-wrapper")}>
          <span className={cx("title")}>
            Select files to convert or drag & drop
          </span>
          <div className={cx("file-source-button")}>
            <label className={cx("action-label")}>
              <span>From Computer</span>
            </label>
            <div className={cx("menu-wrapper")}>
              {/* <lable>모바일 전용</label> */}
              <div className={cx("dropdown-menu")}>
                <DropdownButton icon={<FaLaptop />} />
                <DropdownButton icon={<FaGoogleDrive />} />
                <DropdownButton icon={<FaDropbox />} />
                <DropdownButton icon={<FaLink />} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConvertContent;
