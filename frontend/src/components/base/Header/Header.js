// @flow
import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.scss';
import Logo from '../Logo';
import HeaderNav from '../HeaderNav/HeaderNav';
import UserButton from '../UserButton';
import Button from '../../common/Button';

const cx = classNames.bind(styles);

type Props = {
    user?: any,
    isRegister?: boolean,
    solid?: boolean,
    shadow?: boolean
}

const Header = ({ solid, shadow, isRegister, user }: Props) => {
    return (
        <div className={cx('header', { solid, shadow })}>
            <div className={cx('responsive')}>
                <div className={cx('logo-wrapper')}>
                    <Logo/>
                </div>
                { !isRegister && <div className={cx('right-side')}>
                <div className={cx('desktop-only')}>
                  <HeaderNav logged={user}/>
                  {
                    user ? (
                      <UserButton username={'veloss'} />
                    ) : (
                      <Button
                        theme="outline"
                      >
                        로그인
                      </Button>
                    )
                  }
                </div>
              </div> }
            </div>
        </div>
    );
}

export default Header;

