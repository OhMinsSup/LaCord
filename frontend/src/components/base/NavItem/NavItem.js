// @flow
import React, { type Node } from 'react';
import styles from './NavItem.scss';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

type Props = {
    children: Node,
    to?: string
}

const NavItem = ({ children, to }: Props) => {
  if(to) {
    return (
      <NavLink className={cx('nav-item')} activeStyle={{ opacity: 1, fontWeight: '600'}} to={to}>{children}</NavLink>
    )
  }
  return (
    <div className={cx('nav-item')}>
      {children}
    </div>
  );
};

export default NavItem;