import React from 'react';
import classNames from 'classnames/bind';
import styles from './Logo.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Logo = () => {
    return (
        <Link to="/" className={cx('logo')}>
            LaCord    
        </Link>
    );
}

export default Logo;