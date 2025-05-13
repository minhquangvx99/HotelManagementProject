/*
 * This file is part of OrangeHRM
 *
 * Copyright (C) 2020 onwards OrangeHRM (https://www.orangehrm.com/)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

import { WithLogoutAction } from 'types/Global';
import {
  CHANGE_LAYOUT_MODE,
  CHANGE_LAYOUT_MODE_SUCCESS,
  CHANGE_MENU_MODE,
  CHANGE_MENU_MODE_SUCCESS,
  CHANGE_RTL_MODE,
  CHANGE_RTL_MODE_SUCCESS,
  LayoutActionTypes,
  LayoutState,
} from './Types';
import staticData from 'config/Config';

const initialState: LayoutState = {
  rtlData: staticData.rtl,
  topMenu: staticData.topMenu,
  mode: staticData.mainTemplate,
  rtlLoading: false,
  menuLoading: false,
  mainContentLoading: false,
  loading: false,
};

const layoutReducer = (state = initialState, action: WithLogoutAction<LayoutActionTypes>): LayoutState => {
  switch (action.type) {
    case CHANGE_LAYOUT_MODE:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_LAYOUT_MODE_SUCCESS:      
      return {
        ...state,
        mode: action.payload,
        loading: false,
      };
    case CHANGE_RTL_MODE:
      return {
        ...state,
        rtlLoading: true,
      };
    case CHANGE_RTL_MODE_SUCCESS:
      return {
        ...state,
        rtlData: action.payload,
        rtlLoading: false,
      };
    case CHANGE_MENU_MODE:
      return {
        ...state,
        menuLoading: true,
      };
    case CHANGE_MENU_MODE_SUCCESS:
      return {
        ...state,
        topMenu: action.payload,
        menuLoading: false,
      };
    default:
      return state;
  }
};

export default layoutReducer;
