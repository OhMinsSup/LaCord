import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./ModalWrapper.scss";

const cx = classNames.bind(styles);

class ModalWrapper extends Component {
  animateId = null;

  state = {
    animate: false
  };

  animate() {
    this.setState({ animate: true });
    this.animateId = setTimeout(() => {
      this.setState({
        animate: false
      });
    }, 150);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open) {
      this.animate();
    }
  }

  omponentWillUnmount() {
    clearTimeout(this.animateId);
  }

  render() {
    const { children, className, open } = this.props;
    const { animate } = this.state;

    if (!open && !animate) return null;

    return (
      <div className={cx("ModalWrapper")}>
        <div className={cx("dimmer")} />
        <div className={cx("center")}>
          <div className={cx("modal-positioner")}>
            <div
              className={cx("modal-content", className, {
                appear: open,
                disappear: animate && !open
              })}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalWrapper;
