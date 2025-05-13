import { $PropertyType } from 'utility-types';
import {
  StudentModel,
  StudentActionTypes,
  FETCH_DETAILS_STUDENT,
  FETCH_DETAILS_STUDENT_ERR,
  FETCH_DETAILS_STUDENT_SUCCESS,
  FETCH_LIST_STUDENT_PAGING,
  FETCH_LIST_STUDENT_PAGING_ERR,
  FETCH_LIST_STUDENT_PAGING_SUCCESS,
  ADD_UPDATE_STUDENT,
  ADD_UPDATE_STUDENT_ERR,
  ADD_UPDATE_STUDENT_SUCCESS,
  DELETE_STUDENT,
  DELETE_STUDENT_ERR,
  DataStudentPaging,
  DELETE_STUDENT_SUCCESS,
  PASS_DETAILS_STUDENT,
  FETCH_LIST_EXAMTYPESTUDENT_PAGING,
  DELETE_EXAMTYPESTUDENT,
  ExamTypeStudentModel,
  AddOrUpdateStudentModel,
  DataExamTypeStudentPaging,
  FETCH_LIST_EXAMTYPESTUDENT_PAGING_SUCCESS,
  FETCH_LIST_EXAMTYPESTUDENT_PAGING_ERR,
  ADD_UPDATE_EXAMTYPESTUDENT,
  ADD_UPDATE_EXAMTYPESTUDENT_SUCCESS,
  ADD_UPDATE_EXAMTYPESTUDENT_ERR,
  DELETE_EXAMTYPESTUDENT_SUCCESS,
  DELETE_EXAMTYPESTUDENT_ERR,
  UPDATE_STATUS_STUDENT,
  UPDATE_STATUS_STUDENT_SUCCESS,
  UPDATE_STATUS_STUDENT_ERR,
  ResetPasswordModel,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERR,
  ApproveModel,
  APPROVE,
  APPROVE_SUCCESS,
  APPROVE_ERR,
  RefuseModel,
  REFUSE,
  REFUSE_SUCCESS,
  REFUSE_ERR,
  CREATEACCOUNT,
  CREATEACCOUNT_SUCCESS,
  CREATEACCOUNT_ERR,
} from './Types';

export const fetchListStudentPaging = (
  page: number,
  pageSize: number,
  startDate?: string,
  endDate?: string,
  emailSearch?: string,
  status?: number,
): StudentActionTypes => {
  return {
    type: FETCH_LIST_STUDENT_PAGING,
    payload: { page, pageSize, startDate, endDate, emailSearch, status },
  };
};

export const fetchListStudentPagingSuccess = (payload: DataStudentPaging): StudentActionTypes => {
  return {
    type: FETCH_LIST_STUDENT_PAGING_SUCCESS,
    payload,
  };
};

export const fetchListStudentPagingErr = (payload: string): StudentActionTypes => {
  return {
    type: FETCH_LIST_STUDENT_PAGING_ERR,
    payload,
  };
};

export const fetchDetailsStudent = (payload: number): StudentActionTypes => {
  return {
    type: FETCH_DETAILS_STUDENT,
    payload,
  };
};

export const fetchDetailsStudentSuccess = (payload: StudentModel): StudentActionTypes => {
  return {
    type: FETCH_DETAILS_STUDENT_SUCCESS,
    payload,
  };
};

export const fetchDetailsStudentErr = (payload: string): StudentActionTypes => {
  return {
    type: FETCH_DETAILS_STUDENT_ERR,
    payload,
  };
};

export const addOrUpdateStudent = (payload: AddOrUpdateStudentModel): StudentActionTypes => {
  return {
    type: ADD_UPDATE_STUDENT,
    payload,
  };
};

export const addOrUpdateStudentSuccess = (payload: AddOrUpdateStudentModel): StudentActionTypes => {
  return {
    type: ADD_UPDATE_STUDENT_SUCCESS,
    payload,
  };
};

export const addOrUpdateStudentErr = (payload: string): StudentActionTypes => {
  return {
    type: ADD_UPDATE_STUDENT_ERR,
    payload,
  };
};

export const deleteStudent = (payload: number, page: number): StudentActionTypes => {
  return {
    type: DELETE_STUDENT,
    payload,
    page,
  };
};

export const deleteStudentSuccess = (): StudentActionTypes => {
  return {
    type: DELETE_STUDENT_SUCCESS,
  };
};

export const deleteStudentErr = (payload: string): StudentActionTypes => {
  return {
    type: DELETE_STUDENT_ERR,
    payload,
  };
};

export const passDetailsStudent = (question: StudentModel | null): StudentActionTypes => {
  return {
    type: PASS_DETAILS_STUDENT,
    payload: question,
  };
};

export const fetchListExamTypeStudentPaging = (page: number, pageSize: number, UserID: number): StudentActionTypes => {
  return {
    type: FETCH_LIST_EXAMTYPESTUDENT_PAGING,
    payload: { page, pageSize, UserID },
  };
};

export const fetchListExamTypeStudentPagingSuccess = (payload: DataExamTypeStudentPaging): StudentActionTypes => {
  return {
    type: FETCH_LIST_EXAMTYPESTUDENT_PAGING_SUCCESS,
    payload,
  };
};

export const fetchListExamTypeStudentPagingErr = (payload: string): StudentActionTypes => {
  return {
    type: FETCH_LIST_EXAMTYPESTUDENT_PAGING_ERR,
    payload,
  };
};

export const addUpdateExamTypeStudent = (
  payload: ExamTypeStudentModel,
  page: number,
  UserID: number,
): StudentActionTypes => {
  return {
    type: ADD_UPDATE_EXAMTYPESTUDENT,
    payload,
    page,
    UserID,
  };
};

export const addOrUpdateExamTypeStudentSuccess = (payload: ExamTypeStudentModel): StudentActionTypes => {
  return {
    type: ADD_UPDATE_EXAMTYPESTUDENT_SUCCESS,
    payload,
  };
};

export const addOrUpdateExamTypeStudentErr = (payload: string): StudentActionTypes => {
  return {
    type: ADD_UPDATE_EXAMTYPESTUDENT_ERR,
    payload,
  };
};

export const deleteExamTypeStudent = (payload: number, page: number, UserID: number): StudentActionTypes => {
  return {
    type: DELETE_EXAMTYPESTUDENT,
    payload,
    page,
    UserID,
  };
};

export const deleteExamTypeStudentSuccess = (): StudentActionTypes => {
  return {
    type: DELETE_EXAMTYPESTUDENT_SUCCESS,
  };
};

export const deleteExamTypeStudentErr = (payload: string): StudentActionTypes => {
  return {
    type: DELETE_EXAMTYPESTUDENT_ERR,
    payload,
  };
};

export const updateStatusStudent = (ID: number, newStatus: number, page: number): StudentActionTypes => {
  return {
    type: UPDATE_STATUS_STUDENT,
    ID,
    newStatus,
    page,
  };
};

export const updateStatusStudentSuccess = (): StudentActionTypes => {
  return {
    type: UPDATE_STATUS_STUDENT_SUCCESS,
  };
};

export const updateStatusStudentErr = (payload: string): StudentActionTypes => {
  return {
    type: UPDATE_STATUS_STUDENT_ERR,
    payload,
  };
};

export const resetPassword = (payload: ResetPasswordModel): StudentActionTypes => {
  return {
    type: RESET_PASSWORD,
    payload,
  };
};

export const resetPasswordSuccess = (): StudentActionTypes => {
  return {
    type: RESET_PASSWORD_SUCCESS,
  };
};

export const resetPasswordErr = (payload: string): StudentActionTypes => {
  return {
    type: RESET_PASSWORD_ERR,
    payload,
  };
};

export const approve = (payload: ApproveModel): StudentActionTypes => {
  return {
    type: APPROVE,
    payload,
  };
};

export const approveSuccess = (): StudentActionTypes => {
  return {
    type: APPROVE_SUCCESS,
  };
};

export const approveErr = (payload: string): StudentActionTypes => {
  return {
    type: APPROVE_ERR,
    payload,
  };
};

export const createAccount = (payload: ApproveModel): StudentActionTypes => {
  return {
    type: CREATEACCOUNT,
    payload,
  };
};

export const createAccountSuccess = (): StudentActionTypes => {
  return {
    type: CREATEACCOUNT_SUCCESS,
  };
};

export const createAccountErr = (payload: string): StudentActionTypes => {
  return {
    type: CREATEACCOUNT_ERR,
    payload,
  };
};

export const refuse = (payload: RefuseModel): StudentActionTypes => {
  return {
    type: REFUSE,
    payload,
  };
};

export const refuseSuccess = (): StudentActionTypes => {
  return {
    type: REFUSE_SUCCESS,
  };
};

export const refuseErr = (payload: string): StudentActionTypes => {
  return {
    type: REFUSE_ERR,
    payload,
  };
};
