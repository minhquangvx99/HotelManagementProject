import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Content, DropdownStyle } from './Style';
import { DropdownProps } from 'antd';

export interface IDropdown extends DropdownProps {
  title?: string;
  content?: ReactNode;
  style?: any;
}

export const Dropdown: FC<IDropdown> = (props) => {
  const {
    content = (
      <>
        <Link to="#">
          <span>Export to CSV</span>
        </Link>
        <Link to="#">
          <span>Export to XML</span>
        </Link>
        <Link to="#">
          <span>Export to Drive</span>
        </Link>
      </>
    ),
    placement = 'bottomRight',
    title,
    trigger = ['hover'],
    children,
    style = {},
    className = 'ninjadash-dropdown',
  } = props;

  return (
    <DropdownStyle
      overlayClassName={className}
      style={style}
      placement={placement}
      title={title}
      overlay={<Content>{content}</Content>}
      trigger={trigger}
    >
      {children}
    </DropdownStyle>
  );
};
