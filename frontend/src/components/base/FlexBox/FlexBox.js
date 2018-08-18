// flow
import React, { type Node } from 'react';
import styles from './FlexBox.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type Props = {
    children: Node,
    className: string,
    row?: any,
    column?: any
}

const FlexBox = ({ row, column, className, children, ...rest }: Props) => {
  return (
    <div 
      className={cx('flex-box', {
        row,
        column
      }, className)} 
      {...rest}>
      { children }
    </div>
  );
};

export default FlexBox;