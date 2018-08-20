// @flow
import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames/bind';
import styles from './Responsive.scss';

const cx = classNames.bind(styles);

type Props = {
  children: Node,
  className: string
}

const Responsive = ({ children, className, ...rest }: Props) => {
  return (
    <div className={cx('common', 'responsive', className)} {...rest}>
      { children }
    </div>
  );
};

export default Responsive;