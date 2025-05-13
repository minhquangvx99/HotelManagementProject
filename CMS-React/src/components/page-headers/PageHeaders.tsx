import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { HeaderWrapper, PageHeaderStyle } from './Style';
import { PageHeaderProps } from '@ant-design/pro-layout';
import { FC, ReactNode } from 'react';
import { Route } from '@ant-design/pro-layout/es/typing';

export interface IPageHeader extends PageHeaderProps {
  bgColor?: string;
  routes?: Route[];
  buttons?: ReactNode[];
}

export const PageHeader: FC<IPageHeader> = (props) => {
  const { title, subTitle, routes, buttons, ghost, bgColor, className } = props;
  
  const breadcrumb = routes ? (
    <Breadcrumb separator={<span className="ninjadash-seperator" />}>
      {routes.map((route, index) =>
        index + 1 === routes.length ? (
          <Breadcrumb.Item key={index}>{route.breadcrumbName}</Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item key={index}>
            <ReactSVG src={require(`../../static/img/icon/home.svg`).default} />{' '}
            <Link to={route.path}>{route.breadcrumbName}</Link>
          </Breadcrumb.Item>
        ),
      )}
    </Breadcrumb>
  ) : (
    <></>
  );

  return (
    <HeaderWrapper bgColor={bgColor}>
      <PageHeaderStyle
        className={className}
        title={title}
        subTitle={subTitle}
        breadcrumb={breadcrumb}
        extra={buttons}
        ghost={ghost}
      />
    </HeaderWrapper>
  );
};
