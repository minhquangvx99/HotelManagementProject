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
  StudentActionTypes,
  StudentState,
  DELETE_STUDENT,
  DELETE_STUDENT_ERR,
  FETCH_LIST_STUDENT_PAGING,
  FETCH_LIST_STUDENT_PAGING_ERR,
  FETCH_LIST_STUDENT_PAGING_SUCCESS,
  DELETE_STUDENT_SUCCESS,
  PASS_DETAILS_STUDENT,
  ADD_UPDATE_STUDENT,
  ADD_UPDATE_STUDENT_SUCCESS,
  ADD_UPDATE_STUDENT_ERR,
  FETCH_LIST_EXAMTYPESTUDENT_PAGING,
  FETCH_LIST_EXAMTYPESTUDENT_PAGING_SUCCESS,
  FETCH_LIST_EXAMTYPESTUDENT_PAGING_ERR,
  DELETE_EXAMTYPESTUDENT_SUCCESS,
  DELETE_EXAMTYPESTUDENT_ERR,
  DELETE_EXAMTYPESTUDENT,
  ADD_UPDATE_EXAMTYPESTUDENT,
  ADD_UPDATE_EXAMTYPESTUDENT_SUCCESS,
  ADD_UPDATE_EXAMTYPESTUDENT_ERR,
  FETCH_DETAILS_STUDENT,
  FETCH_DETAILS_STUDENT_SUCCESS,
  FETCH_DETAILS_STUDENT_ERR,
  UPDATE_STATUS_STUDENT,
  UPDATE_STATUS_STUDENT_SUCCESS,
  UPDATE_STATUS_STUDENT_ERR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERR,
  APPROVE,
  APPROVE_SUCCESS,
  APPROVE_ERR,
  REFUSE,
  REFUSE_SUCCESS,
  REFUSE_ERR,
  CREATEACCOUNT,
  CREATEACCOUNT_SUCCESS,
  CREATEACCOUNT_ERR,
} from './Types';

const initialState: StudentState = {};


const studentReducer = (state = initialState, action: WithLogoutAction<StudentActionTypes>): StudentState => {
  switch (action.type) {
    case FETCH_LIST_STUDENT_PAGING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LIST_STUDENT_PAGING_SUCCESS:
      return {
        ...state,
        loading: false,
        dataPaging: action.payload,
      };
    case FETCH_LIST_STUDENT_PAGING_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_UPDATE_STUDENT:
      return {
        ...state,
        loading: true,
      };
    case ADD_UPDATE_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        studentForEdit: action.payload
      };
    case ADD_UPDATE_STUDENT_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_STUDENT:
      return {
        ...state,
        loading: true,
      };
    case DELETE_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_STUDENT_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PASS_DETAILS_STUDENT:
      return {
        ...state,
        loading: false,
        studentForEdit: action.payload
      };
      case FETCH_DETAILS_STUDENT:
        return {
          ...state,
          loading: true,
        };
      case FETCH_DETAILS_STUDENT_SUCCESS:
        return {
          ...state,
          loading: false,
          studentForEdit: action.payload,
        };
      case FETCH_DETAILS_STUDENT_ERR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
    case FETCH_LIST_EXAMTYPESTUDENT_PAGING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LIST_EXAMTYPESTUDENT_PAGING_SUCCESS:
      return {
        ...state,
        loading: false,
        dataExamTypeStudentPaging: action.payload,
      };
    case FETCH_LIST_EXAMTYPESTUDENT_PAGING_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_UPDATE_EXAMTYPESTUDENT:
      return {
        ...state,
        loading: true,
      };
    case ADD_UPDATE_EXAMTYPESTUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        examTypeStudentForEdit: action.payload
      };
    case ADD_UPDATE_EXAMTYPESTUDENT_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_EXAMTYPESTUDENT:
      return {
        ...state,
        loading: true,
      };
    case DELETE_EXAMTYPESTUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_EXAMTYPESTUDENT_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_STATUS_STUDENT:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_STATUS_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_STATUS_STUDENT_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    
    case RESET_PASSWORD:
      return {
        ...state,
        loadingResetPassword: true,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loadingResetPassword: false,
      };
    case RESET_PASSWORD_ERR:
      return {
        ...state,
        loadingResetPassword: false,
        error: action.payload,
      };  
      case APPROVE:
        return {
          ...state,
          loadingApprove: true,
        };
      case APPROVE_SUCCESS:
        return {
          ...state,
          loadingApprove: false,
        };
      case APPROVE_ERR:
        return {
          ...state,
          loadingApprove: false,
          error: action.payload,
        };  
        case CREATEACCOUNT:
          return {
            ...state,
            loadingCreateAccount: true,
          };
        case CREATEACCOUNT_SUCCESS:
          return {
            ...state,
            loadingCreateAccount: false,
          };
        case CREATEACCOUNT_ERR:
          return {
            ...state,
            loadingCreateAccount: false,
            error: action.payload,
          };  

        case REFUSE:
          return {
            ...state,
            loadingRefuse: true,
          };
        case REFUSE_SUCCESS:
          return {
            ...state,
            loadingRefuse: false,
          };
        case REFUSE_ERR:
          return {
            ...state,
            loadingRefuse: false,
            error: action.payload,
          };  
    default:
      return state;
  }
};

export default studentReducer;
