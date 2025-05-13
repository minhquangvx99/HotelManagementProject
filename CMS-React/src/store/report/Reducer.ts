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
  ReportExamActionTypes,
  FETCH_LIST_REPORT_EXAM_PAGING,
  FETCH_LIST_REPORT_EXAM_PAGING_ERR,
  FETCH_LIST_REPORT_EXAM_PAGING_SUCCESS,
  ReportExamState,
} from './Types';

const initialState: ReportExamState = {};

const ReportExamReducer = (state = initialState, action: WithLogoutAction<ReportExamActionTypes>): ReportExamState => {
  switch (action.type) {
    case FETCH_LIST_REPORT_EXAM_PAGING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LIST_REPORT_EXAM_PAGING_SUCCESS:
      return {
        ...state,
        loading: false,
        dataPaging: action.payload,
      };
    case FETCH_LIST_REPORT_EXAM_PAGING_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default ReportExamReducer;
