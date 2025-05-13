/* eslint-disable no-shadow */
import { Button } from 'antd';
import Styled from 'styled-components';
import { MergeType } from './Buttons';
import { IGlobalTheme } from 'types/Global';
import { NativeButtonProps } from 'antd/lib/button/button';

interface IButton extends NativeButtonProps {
    outlined?: number;
    transparent?: number;
    squared?: boolean;
    raised?: number;
    social?: boolean;
    load?: boolean;
    mergetype?: MergeType;
    to?: string;
  }

const ButtonGroup = Button.Group;

const outline = (theme: IGlobalTheme, mergetype?: MergeType) => {
    return `
    &&&{
        background: transparent;
        border: 1px ${mergetype === 'dashed' ? 'dashed' : 'solid'} 
        ${mergetype === 'default' || mergetype === 'light' || mergetype === 'dashed' ?
            theme[theme.mainContent ?? 'lightMode']['border-color-secondary'] :
            theme[`${mergetype}-color`]
        };
        color: ${mergetype === 'default' || mergetype === 'light' ? theme['gray-color'] : theme[`${mergetype}-color`]};
        &:hover, &:focus {
            background: transparent;
            border: 1px solid ${mergetype === 'default' || mergetype === 'light' ? theme['primary-color'] : theme[`${mergetype}-hover`]};
            color: ${mergetype === 'default' || mergetype === 'light' ? theme['primary-color'] : theme[`${mergetype}-color`]};
            svg{
                transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                color: ${mergetype === 'default' || mergetype === 'light' || mergetype === 'white' ? theme['primary-color'] : theme[`${mergetype}-color`]};
            }
        }
    }`;
};

const ghosts = (theme: IGlobalTheme) => {
    return `
    &&&{
          background: transparent;
          border: 1px solid ${theme['border-color-normal']} !important;
          color: ${theme['border-color-normal']} !important;
          &:hover, &:focus {
            background: ${theme['border-color-normal']}50 !important;
            border: 1px solid transparent !important;
            color: ${theme['border-color-normal']} !important;
        }
    }`;
};

const transparents = (theme: IGlobalTheme, mergetype?: MergeType) => {
    return `
    &&&{
        background: ${theme[`${mergetype}-color`]}15;
        border-width: 0px;
        color: ${theme[`${mergetype}-color`]};
        &:hover, &:focus {
            background: ${mergetype !== 'default' && theme[`${mergetype}-hover`]}15;
            border-width: 0px;
            color: ${mergetype !== 'default' && theme[`${mergetype}-hover`]}; 
        }
    }`;
};

const raise = (theme: IGlobalTheme, mergetype?: MergeType) => {
    return `
    &&&{
        box-shadow: 0 8px 13px ${mergetype !== 'white' ? theme[`${mergetype}-color`] : theme['light-color']}20;
    }`;
};

const square = (theme: IGlobalTheme, mergetype?: MergeType) => `
 &&&{
    background: ${mergetype !== 'default' && theme[`${mergetype}-color`]};
    border: 1px solid ${mergetype === 'default' || mergetype === 'white' ? theme['disabled-color'] : theme[`${mergetype}-color`]};
    color: ${mergetype !== 'default' && theme['white-color']};
    border-radius: 0px;
    padding: 0px 15px;

    &:hover, &:focus {
        background: ${mergetype !== 'default' && theme[`${mergetype}-hover`]};
        border: 1px solid ${mergetype !== 'default' && theme[`${mergetype}-hover`]};
        color: ${mergetype !== 'default' && theme['white-color']};
    }
}
`;

const squareOutline = (theme: IGlobalTheme, mergetype?: MergeType) => `
 &&&{
    background: transparent;
    border: 1px solid ${mergetype === 'default' || mergetype === 'white' ? theme['disabled-color'] : theme[`${mergetype}-color`]};
    color: ${mergetype !== 'default' && theme[`${mergetype}-color`]};
    border-radius: 0px;
    padding: 0px 15px;
    &:hover, &:focus {
        background: ${mergetype !== 'default' && theme[`${mergetype}-hover`]};
        border: 1px solid ${mergetype !== 'default' && theme[`${mergetype}-hover`]};
        color: ${({ theme, mergetype }: { theme: IGlobalTheme; mergetype?: MergeType }) => mergetype !== 'default' && theme['white-color']};
    }
}
`;

const socialButton = (color?: string, shape?: string) => `
 &&&{
    background: ${color};
    background: ${color};
    border: 1px solid ${color};
    color: ${({ theme }: { theme: IGlobalTheme }) => theme['white-color']};
    border-radius: ${!shape ? '4px' : '40px'};
    padding: 0px 12px;
    display: inline-flex;
    align-items: center;
    span {
        padding-left: 5px;
    }
    &:hover, &:focus {
        background: ${color}90;
        border: 1px solid ${color}90;
        color: ${({ theme }: { theme: IGlobalTheme }) => theme['white-color']};
    }
}
`;

export const ButtonStyled = Styled(Button) <IButton>`
&&& {
    font-size: 14px;
    background: ${({ mergetype, theme }) => mergetype !== 'default' && mergetype !== 'white' && theme[`${mergetype}-color`]};
    border-width: 0px;
    border-style: ${({ mergetype }) => (mergetype !== 'dashed' ? 'solid' : 'dashed')};
    color: ${({ theme, mergetype }) => (mergetype === 'default' || mergetype === 'white' ? theme[theme.mainContent]['gray-text'] : theme['white-color'])};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    opacity: ${({ disabled }) => (disabled ? '0.4' : '1')};
    border-radius: ${({ shape }) => (!shape ? '6px' : '40px')};
    padding: 0px 20.5px;
    height: ${({ size, theme }) => (size ? theme[`btn-height-${size}`] : '44px')};
    font-weight: 600;
    box-shadow: 0 0;
    &:hover, &:focus {
        color: ${({ mergetype, theme }) => (mergetype === 'default' || mergetype === 'white' ? theme['light-color'] : theme['white-color'])};
        background: ${({ mergetype, theme }) => mergetype !== 'default' && theme[`${mergetype}-hover`]};
    }
    i,
    svg,
    img{
        width: 14px;
        height: 14px;
        +span{
            ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: 6px;
        }
    }

    ${({ transparent, theme, mergetype }: { transparent?: number; theme: IGlobalTheme; mergetype?: MergeType }) => transparent && transparents(theme, mergetype)};
    ${({ outlined, theme, mergetype }: { outlined?: number; theme: IGlobalTheme; mergetype?: string }) => outlined && outline(theme, mergetype)};
    ${({ ghost, theme }) => ghost && ghosts(theme)};
    ${({ raised, theme, mergetype }: { raised?: number; theme: IGlobalTheme; mergetype?: MergeType }) => raised && raise(theme, mergetype)};
    ${({ squared, theme, mergetype }: { squared?: boolean; theme: IGlobalTheme; mergetype?: MergeType }) => squared && square(theme, mergetype)};
    ${({ squared, outlined, theme, mergetype }: { squared?: boolean; outlined?: number; theme: IGlobalTheme; mergetype?: MergeType }) => squared && outlined && squareOutline(theme, mergetype)};
    ${({ social, color, shape }: { social?: boolean; color?: string; shape?: string }) => social && socialButton(color, shape)};
}`;

export const ButtonStyledGroup = Styled(ButtonGroup)`
&&& {
    >.ant-btn:first-child{
        border-top-left-radius: 3px !important;
        border-bottom-left-radius: 3px !important;
        border-top-right-radius: 0px !important;
        border-bottom-right-radius: 0px !important;
    }
    >.ant-btn:last-child{
        border-top-left-radius: 0px !important;
        border-bottom-left-radius: 0px !important;
        border-top-right-radius: 3px !important;
        border-bottom-right-radius: 3px !important;
    }
    button {
        margin: 0px;
        padding: 0 10.75px;
        height: 30px;
        font - size: 12px;
        font - weight: 500;
    }
    .ant-btn-light:hover{
        background: ${({ theme }) => theme[theme.mainContent].bgNormal};
    }
}
`;
