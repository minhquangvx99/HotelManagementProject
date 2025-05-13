import { $PropertyType } from 'utility-types';
import {
  ClassModel,
  ClassActionTypes,
  FETCH_DETAILS_CLASS,
  FETCH_DETAILS_CLASS_ERR,
  FETCH_DETAILS_CLASS_SUCCESS,
  FETCH_LIST_CLASS_PAGING,
  FETCH_LIST_CLASS_PAGING_ERR,
  FETCH_LIST_CLASS_PAGING_SUCCESS,
  SAVE_CLASS,
  SAVE_CLASS_ERR,
  DELETE_CLASS,
  DELETE_CLASS_ERR,
  UPDATE_CLASS_FOR_EDIT,
  FETCH_LIST_CLASS_ALL,
  FETCH_LIST_CLASS_ALL_ERR,
  FETCH_LIST_CLASS_ALL_SUCCESS,
  DataClassPaging,
  SAVE_CLASS_SUCCESS,
  DELETE_CLASS_SUCCESS,
} from './Types';

export const fetchListClassPaging = (page: number, pageSize: number, searchKey: string): ClassActionTypes => {
  return {
    type: FETCH_LIST_CLASS_PAGING,
    payload: { page, pageSize, searchKey },
  };
};

export const fetchListClassPagingSuccess = (payload: DataClassPaging): ClassActionTypes => {
  return {
    type: FETCH_LIST_CLASS_PAGING_SUCCESS,
    payload,
  };
};

export const fetchListClassPagingErr = (payload: string): ClassActionTypes => {
  return {
    type: FETCH_LIST_CLASS_PAGING_ERR,
    payload,
  };
};

export const fetchListClassAll = (): ClassActionTypes => {
  return {
    type: FETCH_LIST_CLASS_ALL,
  };
};

export const fetchListClassAllSuccess = (payload: ClassModel[]): ClassActionTypes => {
  return {
    type: FETCH_LIST_CLASS_ALL_SUCCESS,
    payload,
  };
};

export const fetchListClassAllErr = (payload: string): ClassActionTypes => {
  return {
    type: FETCH_LIST_CLASS_ALL_ERR,
    payload,
  };
};

export const fetchDetailsClass = (payload: $PropertyType<ClassModel, 'ID'>): ClassActionTypes => {
  return {
    type: FETCH_DETAILS_CLASS,
    payload,
  };
};

export const fetchDetailsClassSuccess = (payload: ClassModel): ClassActionTypes => {
  return {
    type: FETCH_DETAILS_CLASS_SUCCESS,
    payload,
  };
};

export const fetchDetailsClassErr = (payload: string): ClassActionTypes => {
  return {
    type: FETCH_DETAILS_CLASS_ERR,
    payload,
  };
};

export const saveClass = (payload: ClassModel, page: number): ClassActionTypes => {
  return {
    type: SAVE_CLASS,
    payload,
    page
  };
};

export const saveClassSuccess = (): ClassActionTypes => {
  return {
    type: SAVE_CLASS_SUCCESS,
  };
};

export const saveClassErr = (payload: string): ClassActionTypes => {
  return {
    type: SAVE_CLASS_ERR,
    payload,
  };
};

export const deleteClass = (payload: number, page: number): ClassActionTypes => {
  return {
    type: DELETE_CLASS,
    payload,
    page
  };
};

export const deleteClassSuccess = (): ClassActionTypes => {
  return {
    type: DELETE_CLASS_SUCCESS,
  };
};

export const deleteClassErr = (payload: string): ClassActionTypes => {
  return {
    type: DELETE_CLASS_ERR,
    payload,
  };
};

export const updateClassForEdit = (payload: ClassModel, callback: void): ClassActionTypes => {
  return {
    type: UPDATE_CLASS_FOR_EDIT,
    payload,
    callback
  };
};
