import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./ConvertContent.scss";
import { FaGoogleDrive, FaDropbox, FaLink, FaLaptop } from "react-icons/fa";
import DropdownButton from "../DropdownButton/DropdownButton";

const cx = classNames.bind(styles);

class ConvertContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lable_title: "Computer"
    };
  }

  onMouseOver = name => {
    this.setState({
      lable_title: name
    });
  };

  render() {
    const { onComputerClick } = this.props;
    const { lable_title } = this.state;
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
                <span>From {lable_title}</span>
              </label>
              <div className={cx("menu-wrapper")}>
                <div className={cx("dropdown-menu")}>
                  <DropdownButton
                    icon={<FaLaptop />}
                    type={lable_title === "Computer"}
                    name="Computer"
                    onMouseOver={this.onMouseOver}
                    onClick={onComputerClick}
                  />
                  <DropdownButton
                    icon={<FaGoogleDrive />}
                    type={lable_title === "GoogleDirve"}
                    name="GoogleDirve"
                    onMouseOver={this.onMouseOver}
                  />
                  <DropdownButton
                    icon={<FaDropbox />}
                    type={lable_title === "Dropbox"}
                    name="Dropbox"
                    onMouseOver={this.onMouseOver}
                  />
                  <DropdownButton
                    icon={<FaLink />}
                    type={lable_title === "Link"}
                    name="Link"
                    onMouseOver={this.onMouseOver}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConvertContent;
