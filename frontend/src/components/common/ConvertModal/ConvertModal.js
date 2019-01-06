import React, { Component } from "react";
import classNames from "classnames/bind";
import { FaFileAlt } from "react-icons/fa";
import styles from "./ConvertModal.scss";
import ModalWrapper from "../ModalWrapper";
import Button from "../Button";
import { parseSize } from "../../../lib/common";

const cx = classNames.bind(styles);

class ConvertModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null
    };
  }

  render() {
    const { type } = this.state;
    const { open, title, confirmText, fileData } = this.props;
    return (
      <ModalWrapper open={open}>
        <div className={cx("convert-modal")}>
          <div className={cx("modal-content")}>
            <div className={cx("title")}>
              {title && <h4>{title}</h4>}
              <div className={cx("convert-wrapper")}>
                <span className={cx("to")}>to</span>
                <span className={cx("convert")}>
                  {type === null ? "없음" : type}
                </span>
              </div>
            </div>
            <div className={cx("contents")}>
              <div className={cx("left-content")}>
                <div className={cx("wrapper")}>
                  <div className={cx("file")}>
                    <FaFileAlt className={cx("icon")} />
                    <span className={cx("name")}>{fileData.name}</span>
                  </div>
                  <span className={cx("subinfo")}>
                    <p>{parseSize(fileData.size)}</p>
                    <p>{fileData.type}</p>
                  </span>
                </div>
              </div>
              <div className={cx("right-contents")}>
                <div className={cx("wrapper")}>
                  <div className={cx("convert-types")}>
                    <ul className={cx("types")}>
                      <li>이미지</li>
                      <li>비디오</li>
                      <li>문서</li>
                      <li>유튜브</li>
                      <li>글꼴</li>
                    </ul>
                    <div className={cx("details")}>
                      <ul className={cx("detail")}>
                        <li>DOC</li>
                        <li>PDF</li>
                        <li>PDF</li>
                        <li>DOC</li>
                        <li>PDF</li>
                        <li>PDF</li>
                        <li>PDF</li>
                        <li>PDF</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("button-area")}>
              <Button theme="outline" className={cx("button")}>
                취소
              </Button>
              <Button theme="outline" className={cx("button")}>
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
