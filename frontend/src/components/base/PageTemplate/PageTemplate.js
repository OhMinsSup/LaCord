// @flow
import React, { type Node } from 'react';
import classNames from 'classnames/bind';
import styles from './PageTemplate.scss';

const cx = classNames.bind(styles);

type Props = {
  header: Node,
  children: Node,
}

const PageTemplate = ({ header, children }: Props) => {
  return (
    <div className={cx('page-template')}>
      <header>{header}</header>
      <main>{children}</main>
    </div>    
  );
};
  
export default PageTemplate;