import React from "react";
import classNames from "classnames/bind";
import styles from "./QuestionModal.scss";
import ModalWrapper from "../ModalWrapper";
import Button from "../Button";

const cx = classNames.bind(styles);

const QuestionModal = ({
  title,
  description,
  confirmText,
  onConfirm,
  onCancel,
  open
}) => (
  <ModalWrapper open={open}>
    <div className={cx("QuestionModal")}>
      <div className={cx("modal-content")}>
        {title && <h4>{title}</h4>}
        <p>{description}</p>
        <div className={cx("button-area")}>
          <Button cancel onClick={onCancel} className={cx("btn")}>
            취소
          </Button>
          <Button confirm onClick={onConfirm} className={cx("btn")}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  </ModalWrapper>
);

QuestionModal.defaultProps = {
  title: null,
  confirmText: "확인"
};

export default QuestionModal;
