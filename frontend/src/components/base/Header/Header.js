// @flow
import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.scss';

const cx = classNames.bind(styles);

type Props = {
    user?: any,
    isRegister?: boolean,
}

const Header = ({ isRegister, user }: Props) => {
    return (
        <div className={cx('header', 'solid' )}>
          gkggk
        </div>
    );
}

export default Header;