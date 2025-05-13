import { ExamTypeModel } from 'store/exam-type/Types';
import { TaskModel } from 'store/task/Types';
import { NullableString } from 'types/Global';
import { $PropertyType } from 'utility-types';

export interface KAModel {
  ID?: number;
  Name?: NullableString;
  CodeL2?: NullableString;
  ExamTypeID?: number;
  examType?: ExamTypeModel;
  tasks?: TaskModel[];
}

export interface DataKAPaging {
  listKA?: KAModel[];
  totalRow?: number;
  pageIndex?: number;
  pageSize?: number;
}

export interface KAState {
  dataPaging?: DataKAPaging;
  dataAll?: KAModel[];
  kaForEdit?: KAModel;
  loading?: boolean;
  error?: string;
}

export const FETCH_LIST_KA_PAGING = 'FETCH_LIST_KA_PAGING';
export const FETCH_LIST_KA_PAGING_SUCCESS = 'FETCH_LIST_KA_PAGING_SUCCESS';
export const FETCH_LIST_KA_PAGING_ERR = 'FETCH_LIST_KA_PAGING_ERR';
export const FETCH_LIST_KA_ALL = 'FETCH_LIST_KA_ALL';
export const FETCH_LIST_KA_ALL_SUCCESS = 'FETCH_LIST_KA_ALL_SUCCESS';
export const FETCH_LIST_KA_ALL_ERR = 'FETCH_LIST_KA_ALL_ERR';
export const FETCH_DETAILS_KA = 'FETCH_DETAILS_KA';
export const FETCH_DETAILS_KA_SUCCESS = 'FETCH_DETAILS_KA_SUCCESS';
export const FETCH_DETAILS_KA_ERR = 'FETCH_DETAILS_KA_ERR';
export const SAVE_KA = 'SAVE_KA';
export const SAVE_KA_SUCCESS = 'SAVE_KA_SUCCESS';
export const SAVE_KA_ERR = 'SAVE_KA_ERR';
export const DELETE_KA = 'DELETE_KA';
export const DELETE_KA_SUCCESS = 'DELETE_KA_SUCCESS';
export const DELETE_KA_ERR = 'DELETE_KA_ERR';
export const UPDATE_KA_FOR_EDIT = 'UPDATE_KA_FOR_EDIT';

export interface FetchListKAPagingAction {
  type: typeof FETCH_LIST_KA_PAGING;
  payload: {
    page: number;
    pageSize: number;
    searchKey: string;
  };
}

export interface FetchListKAPagingSuccessAction {
  type: typeof FETCH_LIST_KA_PAGING_SUCCESS;
  payload: DataKAPaging;
}

export interface FetchListKAPagingErrorAction {
  type: typeof FETCH_LIST_KA_PAGING_ERR;
  payload: string;
}

export interface FetchListKAAllAction {
  type: typeof FETCH_LIST_KA_ALL;
}

export interface FetchListKAAllSuccessAction {
  type: typeof FETCH_LIST_KA_ALL_SUCCESS;
  payload: KAModel[];
}

export interface FetchListKAAllErrorAction {
  type: typeof FETCH_LIST_KA_ALL_ERR;
  payload: string;
}

export interface FetchDetailsKAAction {
  type: typeof FETCH_DETAILS_KA;
  payload: $PropertyType<KAModel, 'ID'>;
}

export interface FetchDetailsKASuccessAction {
  type: typeof FETCH_DETAILS_KA_SUCCESS;
  payload: KAModel;
}

export interface FetchDetailsKAErrorAction {
  type: typeof FETCH_DETAILS_KA_ERR;
  payload: string;
}

export interface SaveKAAction {
  type: typeof SAVE_KA;
  payload: KAModel;
  page: number;
}

export interface SaveKASuccessAction {
  type: typeof SAVE_KA_SUCCESS;
}

export interface SaveKAErrorAction {
  type: typeof SAVE_KA_ERR;
  payload: string;
}

export interface DeleteKAAction {
  type: typeof DELETE_KA;
  payload: number;
  page: number;
}

export interface DeleteKASuccessAction {
  type: typeof DELETE_KA_SUCCESS;
}

export interface DeleteKAErrorAction {
  type: typeof DELETE_KA_ERR;
  payload: string;
}

export interface UpdateKAForEditAction {
  type: typeof UPDATE_KA_FOR_EDIT;
  payload: KAModel;
  callback: void;
}

export type KAActionTypes =
  | FetchListKAPagingAction
  | FetchListKAPagingSuccessAction
  | FetchListKAPagingErrorAction
  | FetchListKAAllAction
  | FetchListKAAllSuccessAction
  | FetchListKAAllErrorAction
  | FetchDetailsKAAction
  | FetchDetailsKASuccessAction
  | FetchDetailsKAErrorAction
  | SaveKAAction
  | SaveKASuccessAction
  | SaveKAErrorAction
  | DeleteKAAction
  | DeleteKASuccessAction
  | DeleteKAErrorAction
  | UpdateKAForEditAction;
