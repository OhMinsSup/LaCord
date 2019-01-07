import React from "react";
import classNames from "classnames/bind";
import styles from "./UrlModal.scss";
import ModalWrapper from "../ModalWrapper";
import Button from "../Button";

const cx = classNames.bind(styles);

const UrlModal = ({
  open,
  title,
  confirmText,
  onCancel,
  input,
  onChange,
  error
}) => (
  <ModalWrapper open={open}>
    <div className={cx("url-modal")}>
      <div className={cx("modal-content")}>
        {title && <h4>{title}</h4>}
        <p>youtube 링크를 입력하시면 mp3형태로 변환합니다.</p>
        <div className={cx("input-wrapper")}>
          <input value={input} onChange={onChange} placeholder="https://" />
        </div>
        {error && <p className={cx("error")}>{error}</p>}
        <div className={cx("button-area")}>
          <Button className={cx("button")} theme="outline" onClick={onCancel}>
            취소
          </Button>
          <Button
            className={cx("button")}
            theme="outline"
            onClick={() => console.log("ds")}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  </ModalWrapper>
);

export default UrlModal;
