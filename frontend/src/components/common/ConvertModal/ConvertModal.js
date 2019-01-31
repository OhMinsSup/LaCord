import React, { Component } from "react";
import classNames from "classnames/bind";
import { FaFileAlt } from "react-icons/fa";
import styles from "./ConvertModal.scss";
import ModalWrapper from "../ModalWrapper";
import Button from "../Button";
import { parseSize } from "../../../lib/common";

const cx = classNames.bind(styles);

const options = ["jpeg", "bmp", "tiff", "png", "gif"];

class ConvertModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "jpeg"
    };
  }

  onSelect = e => {
    this.setState({
      selected: e.target.value
    });
  };

  onConvert = () => {
    this.props.onConvert(this.state.selected);
  };

  render() {
    const { selected } = this.state;
    const { open, title, confirmText, fileData, onCancel } = this.props;
    return (
      <ModalWrapper open={open}>
        <div className={cx("convert-modal")}>
          <div className={cx("modal-content")}>
            <div className={cx("title")}>
              {title && <h4>{title}</h4>}
              <div className={cx("convert-wrapper")}>
                <span className={cx("to")}>to</span>
                <span className={cx("convert")}>
                  <select value={selected} onChange={this.onSelect}>
                    {options.map(option => {
                      return (
                        <option value={option} key={option}>
                          {option}
                        </option>
                      );
                    })}
                  </select>
                </span>
              </div>
            </div>
            <div className={cx("contents")}>
              <div className={cx("content")}>
                <div className={cx("wrapper")}>
                  <div className={cx("file")}>
                    <FaFileAlt className={cx("icon")} />
                    <span className={cx("name")}>{fileData.name}</span>
                  </div>
                  <span className={cx("subinfo")}>
                    <p>{fileData.size === 0 ? 0 : parseSize(fileData.size)}</p>
                    <p>{fileData.type}</p>
                  </span>
                </div>
              </div>
            </div>
            <div className={cx("button-area")}>
              <Button
                theme="outline"
                className={cx("button")}
                onClick={onCancel}
              >
                취소
              </Button>
              <Button
                theme="outline"
                className={cx("button")}
                onClick={this.onConvert}
              >
                {confirmText}
              </Button>
            </div>
          </div>
        </div>
      </ModalWrapper>
    );
  }
}

export default ConvertModal;
