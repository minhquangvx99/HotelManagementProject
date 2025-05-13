import { ModalStyled } from './Style';
import { Button, MergeType } from 'components/buttons/Buttons';
import { ModalProps } from 'antd';
import { FC } from 'react';

export interface IModal extends ModalProps {
  type?: string | boolean;
  color?: boolean;
  titleCancel?: string;
  titleConfirm?: string;
}

export const Modal: FC<IModal> = (props) => {
  const {
    onCancel,
    className = 'atbd-modal',
    onOk,
    open,
    title,
    type,
    color,
    footer,
    width = 620,
    children,
    titleCancel,
    titleConfirm,
  } = props;

  return (
    <ModalStyled
      title={title}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      type={color ? type : false}
      width={width}
      className={className}
      footer={
        footer || footer === null
          ? footer
          : [
              <Button mergetype="secondary" key="back" onClick={onCancel}>
                {titleCancel ?? 'Cancel'}
              </Button>,
              <Button mergetype={type as MergeType} key="submit" onClick={onOk}>
                {titleConfirm ?? 'Save Change'}
              </Button>,
            ]
      }
    >
      {children}
    </ModalStyled>
  );
};

export const alertModal = ModalStyled;
