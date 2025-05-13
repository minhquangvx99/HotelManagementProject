import UilCheck from '@iconscout/react-unicons/dist/icons/uil-check';
import { Link } from 'react-router-dom';
import { Content, PopoverStyle, Title } from './Style';
import './Style.css';
import { FC, ReactNode } from 'react';
import { PopoverProps } from 'antd';

export interface IPopover extends PopoverProps {
  content?: ReactNode;
  title?: ReactNode;
}

export const Popover: FC<IPopover> = (props) => {
  const {
    content = (
      <>
        <Link to="#">
          <UilCheck />
          <span>Btn Dropdown one</span>
        </Link>
        <Link to="#">
          <UilCheck />
          <span>Btn Dropdown two</span>
        </Link>
        <Link to="#">
          <UilCheck />
          <span>Btn Dropdown three</span>
        </Link>
      </>
    ),
    placement = 'bottom',
    title,
    trigger = 'hover',
    children,
  } = props;
  const content1 = <Content>{content}</Content>;

  return (
    <PopoverStyle placement={placement} title={title && <Title>{title}</Title>} content={content1} trigger={trigger}>
      {children}
    </PopoverStyle>
  );
};
