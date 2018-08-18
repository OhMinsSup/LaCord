// @flow
import React from 'react';
import styles from './UserButton.scss';
import classNames from 'classnames/bind';
import { IoMdPerson } from 'react-icons/io';

const cx = classNames.bind(styles);

type Props = {
    username: string,
    onClick(): void
}

const UserButton = ({ username, onClick }: Props) => {
  return (
    <div className={cx('user-button')} onClick={onClick}>
      <IoMdPerson/>
      <div className={cx('username')}>
        {username}
      </div>
    </div>
  );
};

export default UserButton;