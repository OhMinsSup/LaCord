import React from 'react';
import classNames from 'classnames/bind';
import styles from './LandingTemplate.scss';

const cx = classNames.bind(styles);

const LandingTemplate = () => {
    return (
        <div className={cx('landing-template')}>
            <div className={cx('banner-wrapper')}>
                <div className={cx('title')}>나만의 여행 플래너 LaCord</div>
                <div className={cx('descritpion')}>쉽고 빠르게 계획하세요</div>
                <div className={cx('search-area')}>
                    <input className={cx('search-input')} placeholder="국가명, 도시명으로 검색"/>
                </div>
            </div>
        </div>
    );
};

export default LandingTemplate;