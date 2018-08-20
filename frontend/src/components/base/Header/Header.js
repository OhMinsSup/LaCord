// @flow
import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.scss';
import Logo from '../Logo';
import NavItem from '../NavItem';
import Button from '../../common/Button';
import Responsive from '../../common/Responsive';

const cx = classNames.bind(styles);

type Props = {
    user?: any,
    isRegister?: boolean,
}

const Header = ({ isRegister, user }: Props) => {
    return (
        <div className={cx('header')}>
            <Responsive>
                <div className={cx('wrapper')}>
                    <div className={cx('content')}>
                        <Logo />
                        {
                            !isRegister && <div className={cx('right-side')}>
                                <div className={cx('desktop-only')}>
                                    <div className={cx('flex-box', 'row')}>
                                        <NavItem>여행지</NavItem>
                                        <NavItem>일정</NavItem>
                                        <NavItem>숙소</NavItem>
                                    </div>
                                    {
                                        user ? (
                                            <button>유저 버튼</button>
                                        ) : ( <Button theme="invert">로그인</Button>)
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </Responsive>
      </div>
    );
}

export default Header;
