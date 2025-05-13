export interface LayoutState {
  rtlData: boolean;
  topMenu: boolean;
  mode: string;
  rtlLoading: boolean;
  menuLoading: boolean;
  mainContentLoading: boolean;
  loading: boolean;
}

export const CHANGE_LAYOUT_MODE = 'CHANGE_LAYOUT_MODE';
export const CHANGE_LAYOUT_MODE_SUCCESS = 'CHANGE_LAYOUT_MODE_SUCCESS';
export const CHANGE_RTL_MODE = 'CHANGE_RTL_MODE';
export const CHANGE_RTL_MODE_SUCCESS = 'CHANGE_RTL_MODE_SUCCESS';
export const CHANGE_MENU_MODE = 'CHANGE_MENU_MODE';
export const CHANGE_MENU_MODE_SUCCESS = 'CHANGE_MENU_MODE_SUCCESS';

export interface ChangeLayoutAction {
  type: typeof CHANGE_LAYOUT_MODE;
  payload: string;
}

export interface ChangeLayoutSuccessAction {
  type: typeof CHANGE_LAYOUT_MODE_SUCCESS;
  payload: string;
}

export interface ChangeRtlModeAction {
  type: typeof CHANGE_RTL_MODE;
  payload: boolean;
}

export interface ChangeRtlModeSuccessAction {
  type: typeof CHANGE_RTL_MODE_SUCCESS;
  payload: boolean;
}

export interface ChangeMenuModeAction {
  type: typeof CHANGE_MENU_MODE;
  payload: boolean;
}

export interface ChangeMenuModeSuccessAction {
  type: typeof CHANGE_MENU_MODE_SUCCESS;
  payload: boolean;
}

export type LayoutActionTypes =
  | ChangeLayoutAction
  | ChangeLayoutSuccessAction
  | ChangeRtlModeAction
  | ChangeRtlModeSuccessAction
  | ChangeMenuModeAction
  | ChangeMenuModeSuccessAction;
