import { $PropertyType } from 'utility-types';
import {
  ExamTypeModel,
  ExamTypeActionTypes,
  FETCH_DETAILS_EXAM_TYPE,
  FETCH_DETAILS_EXAM_TYPE_ERR,
  FETCH_DETAILS_EXAM_TYPE_SUCCESS,
  FETCH_LIST_EXAM_TYPE_PAGING,
  FETCH_LIST_EXAM_TYPE_PAGING_ERR,
  FETCH_LIST_EXAM_TYPE_PAGING_SUCCESS,
  SAVE_EXAM_TYPE,
  SAVE_EXAM_TYPE_ERR,
  DELETE_EXAM_TYPE,
  DELETE_EXAM_TYPE_ERR,
  UPDATE_EXAM_TYPE_FOR_EDIT,
  FETCH_LIST_EXAM_TYPE_ALL,
  FETCH_LIST_EXAM_TYPE_ALL_ERR,
  FETCH_LIST_EXAM_TYPE_ALL_SUCCESS,
  DataExamTypePaging,
  SAVE_EXAM_TYPE_SUCCESS,
  DELETE_EXAM_TYPE_SUCCESS,
  FETCH_LIST_EXAM_TYPE_DROP_LIST,
  FETCH_LIST_EXAM_TYPE_DROP_LIST_SUCCESS,
  FETCH_LIST_EXAM_TYPE_DROP_LIST_ERR,
} from './Types';

export const fetchListExamTypePaging = (page: number, pageSize: number, searchKey: string): ExamTypeActionTypes => {
  return {
    type: FETCH_LIST_EXAM_TYPE_PAGING,
    payload: { page, pageSize, searchKey },
  };
};

export const fetchListExamTypePagingSuccess = (payload: DataExamTypePaging): ExamTypeActionTypes => {
  return {
    type: FETCH_LIST_EXAM_TYPE_PAGING_SUCCESS,
    payload,
  };
};

export const fetchListExamTypePagingErr = (payload: string): ExamTypeActionTypes => {
  return {
    type: FETCH_LIST_EXAM_TYPE_PAGING_ERR,
    payload,
  };
};

export const fetchListExamTypeAll = (): ExamTypeActionTypes => {
  return {
    type: FETCH_LIST_EXAM_TYPE_ALL,
  };
};
export const fetchListExamTypeDropList = (userID: number,examTypeID : number): ExamTypeActionTypes => {
  return {
    type: FETCH_LIST_EXAM_TYPE_DROP_LIST,
    userID,
    examTypeID

  };
};

export const fetchListExamTypeDropListSuccess = (payload: ExamTypeModel[]): ExamTypeActionTypes => {
  return {
    type: FETCH_LIST_EXAM_TYPE_DROP_LIST_SUCCESS,
    payload,
  };
};

export const fetchListExamTypeDropListErr = (payload: string): ExamTypeActionTypes => {
  return {
    type: FETCH_LIST_EXAM_TYPE_DROP_LIST_ERR,
    payload,
  };
};
export const fetchListExamTypeAllSuccess = (payload: ExamTypeModel[]): ExamTypeActionTypes => {
  return {
    type: FETCH_LIST_EXAM_TYPE_ALL_SUCCESS,
    payload,
  };
};

export const fetchListExamTypeAllErr = (payload: string): ExamTypeActionTypes => {
  return {
    type: FETCH_LIST_EXAM_TYPE_ALL_ERR,
    payload,
  };
};

export const fetchDetailsExamType = (payload: $PropertyType<ExamTypeModel, 'ID'>): ExamTypeActionTypes => {
  return {
    type: FETCH_DETAILS_EXAM_TYPE,
    payload,
  };
};

export const fetchDetailsExamTypeSuccess = (payload: ExamTypeModel): ExamTypeActionTypes => {
  return {
    type: FETCH_DETAILS_EXAM_TYPE_SUCCESS,
    payload,
  };
};

export const fetchDetailsExamTypeErr = (payload: string): ExamTypeActionTypes => {
  return {
    type: FETCH_DETAILS_EXAM_TYPE_ERR,
    payload,
  };
};

export const saveExamType = (payload: ExamTypeModel, page: number): ExamTypeActionTypes => {
  return {
    type: SAVE_EXAM_TYPE,
    payload,
    page
  };
};

export const saveExamTypeSuccess = (): ExamTypeActionTypes => {
  return {
    type: SAVE_EXAM_TYPE_SUCCESS,
  };
};

export const saveExamTypeErr = (payload: string): ExamTypeActionTypes => {
  return {
    type: SAVE_EXAM_TYPE_ERR,
    payload,
  };
};

export const deleteExamType = (payload: number, page: number): ExamTypeActionTypes => {
  return {
    type: DELETE_EXAM_TYPE,
    payload,
    page
  };
};

export const deleteExamTypeSuccess = (): ExamTypeActionTypes => {
  return {
    type: DELETE_EXAM_TYPE_SUCCESS,
  };
};

export const deleteExamTypeErr = (payload: string): ExamTypeActionTypes => {
  return {
    type: DELETE_EXAM_TYPE_ERR,
    payload,
  };
};

export const updateExamTypeForEdit = (payload: ExamTypeModel, callback: void): ExamTypeActionTypes => {
  return {
    type: UPDATE_EXAM_TYPE_FOR_EDIT,
    payload,
    callback
  };
};
