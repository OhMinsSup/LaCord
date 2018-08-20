// @flow
import React, { type Node } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.scss';

const cx = classNames.bind(styles);

type Props = {
  theme: void | 'default' | 'outline' | 'invert',
  children: Node,
  to?: string,
  className?: string
};

const Button = ({ theme, children, to, className, ...rest }: Props) => {
  const publicClassName = cx('Button', theme, className);
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
  )
};

Button.defaultProps = {
  theme: 'default',
};

export default Button;