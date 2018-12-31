import React from "react";
import classNames from "classnames/bind";
import styles from "./LabelInput.scss";

const cx = classNames.bind(styles);

const LabelInput = ({ disabled, label, required, value, ...rest }) => {
  return (
    <div className={cx("label-input", { disabled })}>
      <div className={cx("label")}>
        {label} {required && <span>*</span>}
      </div>
      <input value={value} {...rest} disabled={disabled} />
    </div>
  );
};

LabelInput.defaultProps = {
  value: "",
  disabled: false,
  required: false
};

export default LabelInput;
