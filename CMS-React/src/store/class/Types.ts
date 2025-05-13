import { Usercls } from 'store/class-student/Type';
import { StudentModel } from 'store/student/Types';
import { NullableString } from 'types/Global';
import { $PropertyType } from 'utility-types';

export interface ClassModel {
  ID?: number;
  Content?: NullableString;
  Usercls?: StudentModel[];
}
export interface DataClassPaging {
  listClass?: ClassModel[];
  totalRow?: number;
  pageIndex?: number;
  pageSize?: number;
}

export interface ClassState {
  data?: ClassModel[];
  dataPaging?: DataClassPaging;
  classForEdit?: ClassModel;
  loading?: boolean;
  error?: string;
}

export const FETCH_LIST_CLASS_PAGING = 'FETCH_LIST_CLASS_PAGING';
export const FETCH_LIST_CLASS_PAGING_SUCCESS = 'FETCH_LIST_CLASS_PAGING_SUCCESS';
export const FETCH_LIST_CLASS_PAGING_ERR = 'FETCH_LIST_CLASS_PAGING_ERR';
export const FETCH_LIST_CLASS_ALL = 'FETCH_LIST_CLASS_ALL';
export const FETCH_LIST_CLASS_ALL_SUCCESS = 'FETCH_LIST_CLASS_ALL_SUCCESS';
export const FETCH_LIST_CLASS_ALL_ERR = 'FETCH_LIST_CLASS_ALL_ERR';
export const FETCH_DETAILS_CLASS = 'FETCH_DETAILS_CLASS';
export const FETCH_DETAILS_CLASS_SUCCESS = 'FETCH_DETAILS_CLASS_SUCCESS';
export const FETCH_DETAILS_CLASS_ERR = 'FETCH_DETAILS_CLASS_ERR';
export const SAVE_CLASS = 'SAVE_CLASS';
export const SAVE_CLASS_SUCCESS = 'SAVE_CLASS_SUCCESS';
export const SAVE_CLASS_ERR = 'SAVE_CLASS_ERR';
export const DELETE_CLASS_SUCCESS = 'DELETE_CLASS_SUCCESS';
export const DELETE_CLASS = 'DELETE_CLASS';
export const DELETE_CLASS_ERR = 'DELETE_CLASS_ERR';
export const UPDATE_CLASS_FOR_EDIT = 'UPDATE_CLASS_FOR_EDIT';

export interface FetchListClassPagingAction {
  type: typeof FETCH_LIST_CLASS_PAGING;
  payload: {
    page: number;
    pageSize: number;
    searchKey: string;
  };
}

export interface FetchListClassPagingSuccessAction {
  type: typeof FETCH_LIST_CLASS_PAGING_SUCCESS;
  payload: DataClassPaging;
}

export interface FetchListClassPagingErrorAction {
  type: typeof FETCH_LIST_CLASS_PAGING_ERR;
  payload: string;
}

export interface FetchListClassAllAction {
  type: typeof FETCH_LIST_CLASS_ALL;
}

export interface FetchListClassAllSuccessAction {
  type: typeof FETCH_LIST_CLASS_ALL_SUCCESS;
  payload: ClassModel[];
}

export interface FetchListClassAllErrorAction {
  type: typeof FETCH_LIST_CLASS_ALL_ERR;
  payload: string;
}

export interface FetchDetailsClassAction {
  type: typeof FETCH_DETAILS_CLASS;
  payload: $PropertyType<ClassModel, 'ID'>;
}

export interface FetchDetailsClassSuccessAction {
  type: typeof FETCH_DETAILS_CLASS_SUCCESS;
  payload: ClassModel;
}

export interface FetchDetailsClassErrorAction {
  type: typeof FETCH_DETAILS_CLASS_ERR;
  payload: string;
}

export interface SaveClassAction {
  type: typeof SAVE_CLASS;
  payload: ClassModel;
  page: number;
}

export interface SaveClassSuccessAction {
  type: typeof SAVE_CLASS_SUCCESS;
}

export interface SaveClassErrorAction {
  type: typeof SAVE_CLASS_ERR;
  payload: string;
}

export interface DeleteClassAction {
  type: typeof DELETE_CLASS;
  payload: number;
  page: number;
}

export interface DeleteClassSuccessAction {
  type: typeof DELETE_CLASS_SUCCESS;
}

export interface DeleteClassErrorAction {
  type: typeof DELETE_CLASS_ERR;
  payload: string;
}

export interface UpdateClassForEditAction {
  type: typeof UPDATE_CLASS_FOR_EDIT;
  payload: ClassModel;
  callback: void;
}


export type ClassActionTypes =
  | FetchListClassPagingAction
  | FetchListClassPagingSuccessAction
  | FetchListClassPagingErrorAction
  | FetchListClassAllAction
  | FetchListClassAllSuccessAction
  | FetchListClassAllErrorAction
  | FetchDetailsClassAction
  | FetchDetailsClassSuccessAction
  | FetchDetailsClassErrorAction
  | SaveClassAction
  | SaveClassSuccessAction
  | SaveClassErrorAction
  | DeleteClassAction
  | DeleteClassSuccessAction
  | DeleteClassErrorAction
  | UpdateClassForEditAction;

