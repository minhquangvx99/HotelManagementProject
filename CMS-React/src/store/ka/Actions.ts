import { $PropertyType } from 'utility-types';
import {
  KAModel,
  KAActionTypes,
  FETCH_DETAILS_KA,
  FETCH_DETAILS_KA_ERR,
  FETCH_DETAILS_KA_SUCCESS,
  FETCH_LIST_KA_PAGING,
  FETCH_LIST_KA_PAGING_ERR,
  FETCH_LIST_KA_PAGING_SUCCESS,
  SAVE_KA,
  SAVE_KA_ERR,
  DELETE_KA,
  DELETE_KA_ERR,
  UPDATE_KA_FOR_EDIT,
  FETCH_LIST_KA_ALL,
  FETCH_LIST_KA_ALL_ERR,
  FETCH_LIST_KA_ALL_SUCCESS,
  DataKAPaging,
  SAVE_KA_SUCCESS,
  DELETE_KA_SUCCESS,
} from './Types';

export const fetchListKAPaging = (page: number, pageSize: number, searchKey: string): KAActionTypes => {
  return {
    type: FETCH_LIST_KA_PAGING,
    payload: { page, pageSize, searchKey },
  };
};

export const fetchListKAPagingSuccess = (payload: DataKAPaging): KAActionTypes => {
  return {
    type: FETCH_LIST_KA_PAGING_SUCCESS,
    payload,
  };
};

export const fetchListKAPagingErr = (payload: string): KAActionTypes => {
  return {
    type: FETCH_LIST_KA_PAGING_ERR,
    payload,
  };
};

export const fetchListKAAll = (): KAActionTypes => {
  return {
    type: FETCH_LIST_KA_ALL,
  };
};

export const fetchListKAAllSuccess = (payload: KAModel[]): KAActionTypes => {
  return {
    type: FETCH_LIST_KA_ALL_SUCCESS,
    payload,
  };
};

export const fetchListKAAllErr = (payload: string): KAActionTypes => {
  return {
    type: FETCH_LIST_KA_ALL_ERR,
    payload,
  };
};

export const fetchDetailsKA = (payload: $PropertyType<KAModel, 'ID'>): KAActionTypes => {
  return {
    type: FETCH_DETAILS_KA,
    payload,
  };
};

export const fetchDetailsKASuccess = (payload: KAModel): KAActionTypes => {
  return {
    type: FETCH_DETAILS_KA_SUCCESS,
    payload,
  };
};

export const fetchDetailsKAErr = (payload: string): KAActionTypes => {
  return {
    type: FETCH_DETAILS_KA_ERR,
    payload,
  };
};

export const saveKA = (payload: KAModel, page: number): KAActionTypes => {
  return {
    type: SAVE_KA,
    payload,
    page
  };
};

export const saveKASuccess = (): KAActionTypes => {
  return {
    type: SAVE_KA_SUCCESS,
  };
};

export const saveKAErr = (payload: string): KAActionTypes => {
  return {
    type: SAVE_KA_ERR,
    payload,
  };
};

export const deleteKA = (payload: number, page: number): KAActionTypes => {
  return {
    type: DELETE_KA,
    payload,
    page
  };
};

export const deleteKASuccess = (): KAActionTypes => {
  return {
    type: DELETE_KA_SUCCESS,
  };
};

export const deleteKAErr = (payload: string): KAActionTypes => {
  return {
    type: DELETE_KA_ERR,
    payload,
  };
};

export const updateKAForEdit = (payload: KAModel, callback: void): KAActionTypes => {
  return {
    type: UPDATE_KA_FOR_EDIT,
    payload,
    callback
  };
};
