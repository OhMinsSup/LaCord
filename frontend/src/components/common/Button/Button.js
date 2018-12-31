import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Button.scss";

const cx = classNames.bind(styles);

const Button = ({ theme, children, to, className, ...rest }) => {
  const publicClassName = cx("Button", theme, className);

  if (to) {
    return (
      <Link to={to} className={publicClassName} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button className={publicClassName} {...rest}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  theme: "default"
};

export default Button;
