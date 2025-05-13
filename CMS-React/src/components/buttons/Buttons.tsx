import React, { FC, useState } from 'react';
import { ButtonStyled, ButtonStyledGroup } from './Style';
import { AlertProps } from 'antd';
import { ButtonGroupProps } from 'antd/es/button';
import { BaseButtonProps, NativeButtonProps } from 'antd/es/button/button';
import { $PropertyType } from 'utility-types';

// @Todo props spreading

export type MergeType = $PropertyType<BaseButtonProps, 'type'> | $PropertyType<AlertProps, 'type'> | string;

interface IButton extends NativeButtonProps {
  outlined?: boolean;
  transparent?: boolean;
  squared?: boolean;
  raised?: boolean;
  social?: boolean;
  load?: boolean;
  mergetype?: MergeType;
  to?: string;
  loadingProp?: boolean;
}

export const Button: FC<IButton> = (props) => {
  const {
    mergetype,
    shape,
    icon,
    size,
    outlined,
    ghost,
    transparent,
    raised,
    squared,
    color,
    social,
    load,
    children,
    to,
    loadingProp,
    ...rest
  } = props;
  const [state, setState] = useState({
    loading: false,
  });

  const enterLoading = (e: React.MouseEvent<HTMLElement>) => {
    setState({ loading: true });
  };

  return (
    <ButtonStyled
      squared={squared}
      outlined={outlined ? 1 : 0}
      ghost={ghost}
      transparent={transparent ? 1 : 0}
      raised={raised ? 1 : 0}
      size={size}
      shape={shape}
      mergetype={mergetype}
      icon={icon}
      color={color}
      social={social}
      onClick={load ? enterLoading : () => {}}
      loading={loadingProp ? loadingProp : state.loading}
      {...rest}
    >
      {children}
    </ButtonStyled>
  );
};

interface IBtnGroup extends ButtonGroupProps {}

export const BtnGroup: FC<IBtnGroup> = ({ children }) => {
  return <ButtonStyledGroup>{children}</ButtonStyledGroup>;
};
