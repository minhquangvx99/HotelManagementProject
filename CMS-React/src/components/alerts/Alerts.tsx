import { FC } from 'react';
import { AlertWrap } from './Style';
import { AlertProps } from 'antd';

interface IAlert extends AlertProps {
  outlined?: boolean;
  shape?: boolean;
}

export const Alert: FC<IAlert> = (props) => {
  const {
    type = 'success',
    icon,
    message = 'Hello there! A simple success alert—check it out!',
    description,
    showIcon,
    outlined,
    closable,
    closeText,
  } = props;

  return (
    <AlertWrap
      message={message}
      type={type}
      description={description}
      closable={closable}
      showIcon={showIcon && showIcon}
      outlined={outlined ? 1 : 0}
      closeText={closeText && closeText}
      icon={icon && icon}
    />
  );
};
