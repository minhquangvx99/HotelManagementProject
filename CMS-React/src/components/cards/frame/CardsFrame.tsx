import UilEllipsisH from '@iconscout/react-unicons/dist/icons/uil-ellipsis-h';
import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { CardFrame } from './Style';
import { CardProps } from 'antd';
import { Dropdown } from 'components/dropdown/Dropdown';
import { Heading } from 'components/heading/Heading';

export interface ICards extends CardProps {
  isbutton?: ReactNode;
  more?: ReactNode;
  headless?: boolean;
  border?: boolean;
  bodypadding?: string;
  moreText?: boolean;
  caption?: string;
}

export const Cards: FC<ICards> = (props) => {
  const {
    title,
    children,
    more,
    moreText,
    size,
    headless,
    caption,
    isbutton,
    bodyStyle,
    headStyle,
    border = false,
    bodypadding,
    className,
  } = props;
  return (
    <>
      {!headless ? (
        <CardFrame
          size={size}
          title={title}
          bodyStyle={bodyStyle && bodyStyle}
          headStyle={headStyle && headStyle}
          bordered={border}
          className={className}
          bodypadding={bodypadding && bodypadding}
          extra={
            <>
              {more && (
                <Dropdown content={more} placement="bottom">
                  <Link onClick={(e) => e.preventDefault()} to="#">
                    {!moreText ? <UilEllipsisH /> : 'More'}
                  </Link>
                </Dropdown>
              )}

              {isbutton && isbutton}
            </>
          }
          style={{ width: '100%' }}
        >
          {children}
        </CardFrame>
      ) : (
        <CardFrame
          bodypadding={bodypadding && bodypadding}
          bodyStyle={bodyStyle && bodyStyle}
          size={size}
          style={{ width: '100%' }}
          bordered={border}
          className={className}
        >
          {title && <Heading as="h4">{title}</Heading>}
          {caption && <p>{caption}</p>}
          {children}
        </CardFrame>
      )}
    </>
  );
};
