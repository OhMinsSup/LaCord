import React from "react";
import classNames from "classnames/bind";
import styles from "./UrlModal.scss";
import ModalWrapper from "../ModalWrapper";
import Button from "../Button";

const cx = classNames.bind(styles);

const options = ["jpeg", "bmp", "tiff", "png", "gif"];

const UrlModal = ({
  open,
  title,
  confirmText,
  onCancel,
  input,
  selected,
  onSelect,
  onChange,
  error
}) => (
  <ModalWrapper open={open}>
    <div className={cx("url-modal")}>
      <div className={cx("modal-content")}>
        {title && <h4>{title}</h4>}
        <p>변환하고 싶은 타입이 있으면 밑에 선택 박스에서 선택해주세요</p>
        <div className={cx("select-wrapper")}>
          <select value={selected} onChange={onSelect}>
            {options.map(option => {
              return (
                <option value={option} key={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>
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
