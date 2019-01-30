import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./GoBackButton.scss";

import { FaArrowUp } from "react-icons/fa";

const cx = classNames.bind(styles);

class GoBackButton extends Component {
  scrollToTop = () => {
    const div = document.getElementsByTagName("div")[0];

    window.scroll({
      behavior: "smooth",
      left: 0,
      top: div.offsetTop
    });
  };

  render() {
    const { result } = this.props;
    if (!result || result.lenght === 0) return null;

    return (
      <div className={cx("go-back-btn")} id="go" onClick={this.scrollToTop}>
        <span className={cx("go-btn")}>
          <FaArrowUp className={cx("arrow")} />
        </span>
      </div>
    );
  }
}

export default GoBackButton;
