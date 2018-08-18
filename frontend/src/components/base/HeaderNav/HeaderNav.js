import React from 'react';
import styles from './HeaderNav.scss';
import classNames from 'classnames/bind';
import FlexBox from '../FlexBox';
import NavItem from '../NavItem';

const cx = classNames.bind(styles);

const HeaderNav = () => {
  return (
    <FlexBox row
      className={cx('header-nav')}>
      <NavItem to="/">
        글 목록
      </NavItem>
    </FlexBox>
  );
};

export default HeaderNav;