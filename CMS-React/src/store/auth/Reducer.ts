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

import { AuthState, AuthActionTypes, LOGIN, LOGOUT, LOGIN_SUCCESS, LOGIN_ERR, CHANGE_PASSWORD, UPDATE_ACCOUNT_INFORMATION } from './Types';
import { WithLogoutAction } from 'types/Global';

const initialState: AuthState = {};

const authReducer = (state = initialState, action: WithLogoutAction<AuthActionTypes>): AuthState => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_ACCOUNT_INFORMATION:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        shortName: action.payload.ShortName,
        access_token: action.payload.Token,
        myInfo: action.payload.User,
        loading: false,
      };
    case LOGIN_ERR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case LOGOUT:
      localStorage.removeItem("access_token");
      localStorage.removeItem("MyInfo");
      if(localStorage.getItem("IsRemember") !== "true"){
        localStorage.removeItem("Username");
        localStorage.removeItem("Password");
      }
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default authReducer;
