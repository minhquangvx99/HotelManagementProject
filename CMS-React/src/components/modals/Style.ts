import { Modal } from 'antd';
import Styled from 'styled-components';
import { IModal } from './Modals';
import { IGlobalTheme } from 'types/Global';

export const ModalStyledColord = (type: string | boolean, theme: IGlobalTheme) => `
  .ant-modal-content, .ant-modal-header {
    background-color: ${type !== 'default' && theme[`${type}-color`]} !important;
  }
  .ant-modal-title {
    color: #fff;
  }
  .ant-modal-content{
    .ant-modal-close-x{
      svg{
        color: #fff;
      }
    }
    p{
      color: #fff;
    }
  }
  .ant-modal-footer button {
    background: #fff;
    color: #999;
    border: 1px solid #ffff;
  }
`;

export const ModalStyled = Styled(Modal) <IModal>`    
  ${({ theme, type }) => type && ModalStyledColord(type, theme)}
`;

