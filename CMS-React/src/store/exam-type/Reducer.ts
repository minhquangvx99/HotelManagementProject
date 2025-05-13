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
  ExamTypeActionTypes,
  ExamTypeState,
  DELETE_EXAM_TYPE,
  DELETE_EXAM_TYPE_ERR,
  FETCH_LIST_EXAM_TYPE_PAGING,
  FETCH_LIST_EXAM_TYPE_PAGING_ERR,
  FETCH_LIST_EXAM_TYPE_PAGING_SUCCESS,
  SAVE_EXAM_TYPE,
  SAVE_EXAM_TYPE_ERR,
  UPDATE_EXAM_TYPE_FOR_EDIT,
  FETCH_LIST_EXAM_TYPE_ALL,
  FETCH_LIST_EXAM_TYPE_ALL_ERR,
  FETCH_LIST_EXAM_TYPE_ALL_SUCCESS,
  SAVE_EXAM_TYPE_SUCCESS,
  DELETE_EXAM_TYPE_SUCCESS,
  FETCH_LIST_EXAM_TYPE_DROP_LIST,
  FETCH_LIST_EXAM_TYPE_DROP_LIST_SUCCESS,
} from './Types';

const initialState: ExamTypeState = {};

const examTypeReducer = (state = initialState, action: WithLogoutAction<ExamTypeActionTypes>): ExamTypeState => {
  switch (action.type) {
    case FETCH_LIST_EXAM_TYPE_PAGING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LIST_EXAM_TYPE_PAGING_SUCCESS:
      return {
        ...state,
        loading: false,
        dataPaging: action.payload,
      };
    case FETCH_LIST_EXAM_TYPE_PAGING_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_LIST_EXAM_TYPE_ALL:
      return {
        ...state,
        loading: true,
      };
      case FETCH_LIST_EXAM_TYPE_DROP_LIST:
        return {
          ...state,
          loading: true,
        };
        case FETCH_LIST_EXAM_TYPE_DROP_LIST_SUCCESS:
          return {
            ...state,
            loading: false,
            dataDropList: action.payload,
          };
    case FETCH_LIST_EXAM_TYPE_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        dataAll: action.payload,
      };
    case FETCH_LIST_EXAM_TYPE_ALL_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SAVE_EXAM_TYPE:
      return {
        ...state,
        loading: true,
      };
    case SAVE_EXAM_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case SAVE_EXAM_TYPE_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_EXAM_TYPE:
      return {
        ...state,
        loading: true,
      };
    case DELETE_EXAM_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_EXAM_TYPE_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_EXAM_TYPE_FOR_EDIT:
      return {
        ...state,
        examTypeForEdit: action.payload,
      };
    default:
      return state;
  }
};

export default examTypeReducer;
