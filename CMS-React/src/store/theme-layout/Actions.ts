import {
  CHANGE_LAYOUT_MODE,
  CHANGE_LAYOUT_MODE_SUCCESS,
  CHANGE_MENU_MODE,
  CHANGE_MENU_MODE_SUCCESS,
  CHANGE_RTL_MODE,
  CHANGE_RTL_MODE_SUCCESS,
  LayoutActionTypes,
} from 'store/theme-layout/Types';

export const changeLayoutMode = (payload: string): LayoutActionTypes => {
  return {
    type: CHANGE_LAYOUT_MODE,
    payload,
  };
};

export const changeLayoutModeSuccess = (payload: string): LayoutActionTypes => {
  return {
    type: CHANGE_LAYOUT_MODE_SUCCESS,
    payload,
  };
};

export const changeRtlMode = (payload: boolean): LayoutActionTypes => {
  return {
    type: CHANGE_RTL_MODE,
    payload,
  };
};

export const changeRtlModeSuccess = (payload: boolean): LayoutActionTypes => {
  return {
    type: CHANGE_RTL_MODE_SUCCESS,
    payload,
  };
};

export const changeMenuMode = (payload: boolean): LayoutActionTypes => {
  return {
    type: CHANGE_MENU_MODE,
    payload,
  };
};

export const changeMenuModeSuccess = (payload: boolean): LayoutActionTypes => {
  return {
    type: CHANGE_MENU_MODE_SUCCESS,
    payload,
  };
};
