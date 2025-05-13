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
  HotelActionTypes,
  HotelState,
  DELETE_HOTEL,
  DELETE_HOTEL_ERR,
  FETCH_LIST_HOTEL_PAGING,
  FETCH_LIST_HOTEL_PAGING_ERR,
  FETCH_LIST_HOTEL_PAGING_SUCCESS,
  SAVE_HOTEL,
  SAVE_HOTEL_ERR,
  UPDATE_HOTEL_FOR_EDIT,
  FETCH_LIST_HOTEL_ALL,
  FETCH_LIST_HOTEL_ALL_ERR,
  FETCH_LIST_HOTEL_ALL_SUCCESS,
  SAVE_HOTEL_SUCCESS,
  DELETE_HOTEL_SUCCESS,
} from './Types';

const initialState: HotelState = {};


const hotelReducer = (state = initialState, action: WithLogoutAction<HotelActionTypes>): HotelState => {
  switch (action.type) {
    case FETCH_LIST_HOTEL_PAGING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LIST_HOTEL_PAGING_SUCCESS:
      return {
        ...state,
        loading: false,
        dataPaging: action.payload,
      };
    case FETCH_LIST_HOTEL_PAGING_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_LIST_HOTEL_ALL:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LIST_HOTEL_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_LIST_HOTEL_ALL_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SAVE_HOTEL:
      return {
        ...state,
        loading: true,
      };
    case SAVE_HOTEL_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case SAVE_HOTEL_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_HOTEL:
      return {
        ...state,
        loading: true,
      };
    case DELETE_HOTEL_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_HOTEL_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_HOTEL_FOR_EDIT:
      return {
        ...state,
        hotelForEdit: action.payload,
      };
    default:
      return state;
  }
};

export default hotelReducer;
