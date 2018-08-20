// @flow
import React, { type Node } from 'react';
import styles from './NavItem.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type Props = {
    children: Node
}

const NavItem = ({children}: Props) => {
  return (
    <div className={cx('nav-item')}>
      {children}
    </div>
  );
};

export default NavItem;