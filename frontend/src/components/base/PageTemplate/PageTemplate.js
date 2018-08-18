// @flow
import React, { type Node } from 'react';
import classNames from 'classnames/bind';
import styles from './PageTemplate.scss';

const cx = classNames.bind(styles);

type Props = {
  header?: Node,
  children: Node,
  responsive?: any,
  padding?: any,
  mobileNoPadding?: any
}

const PageTemplate = ({ header, children, responsive, padding, mobileNoPadding }: Props) => {
    return (
      <div className={cx('page')}>
        <header>
          {header}
        </header>
        { header && <div>사이드바</div> }
        
        <main className={cx('content', {
          padding: padding, 
          responsive,
          'mobile-no-padding': mobileNoPadding
        })}>
          {children}
        </main>
      </div>
    );
  };
  
  export default PageTemplate;