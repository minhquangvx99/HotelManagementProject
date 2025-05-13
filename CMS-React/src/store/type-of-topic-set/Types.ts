import { TopicSetModel } from 'store/topic-set/Types';
import { NullableString } from 'types/Global';
import { $PropertyType } from 'utility-types';

export interface TypeOfTopicSetModel {
  ID?: number;
  Name?: NullableString;
  NumberOfQuestion?: number;
  SetUpTime?: number;
  topicSets?: TopicSetModel[]; 
}

export interface DataTypeOfTopicSetPaging {
  listTypeOfTopicSet?: TypeOfTopicSetModel[];
  totalRow?: number;
  pageIndex?: number;
  pageSize?: number;
}

export interface TypeOfTopicSetState {
  dataPaging?: DataTypeOfTopicSetPaging;
  dataAll?: TypeOfTopicSetModel[];
  typeOfTopicSetForEdit?: TypeOfTopicSetModel;
  loading?: boolean;
  error?: string;
}

export const FETCH_LIST_TYPE_OF_TOPIC_SET_PAGING = 'FETCH_LIST_TYPE_OF_TOPIC_SET_PAGING';
export const FETCH_LIST_TYPE_OF_TOPIC_SET_PAGING_SUCCESS = 'FETCH_LIST_TYPE_OF_TOPIC_SET_PAGING_SUCCESS';
export const FETCH_LIST_TYPE_OF_TOPIC_SET_PAGING_ERR = 'FETCH_LIST_TYPE_OF_TOPIC_SET_PAGING_ERR';
export const FETCH_LIST_TYPE_OF_TOPIC_SET_ALL = 'FETCH_LIST_TYPE_OF_TOPIC_SET_ALL';
export const FETCH_LIST_TYPE_OF_TOPIC_SET_ALL_SUCCESS = 'FETCH_LIST_TYPE_OF_TOPIC_SET_ALL_SUCCESS';
export const FETCH_LIST_TYPE_OF_TOPIC_SET_ALL_ERR = 'FETCH_LIST_TYPE_OF_TOPIC_SET_ALL_ERR';
export const FETCH_DETAILS_TYPE_OF_TOPIC_SET = 'FETCH_DETAILS_TYPE_OF_TOPIC_SET';
export const FETCH_DETAILS_TYPE_OF_TOPIC_SET_SUCCESS = 'FETCH_DETAILS_TYPE_OF_TOPIC_SET_SUCCESS';
export const FETCH_DETAILS_TYPE_OF_TOPIC_SET_ERR = 'FETCH_DETAILS_TYPE_OF_TOPIC_SET_ERR';
export const SAVE_TYPE_OF_TOPIC_SET = 'SAVE_TYPE_OF_TOPIC_SET';
export const SAVE_TYPE_OF_TOPIC_SET_SUCCESS = 'SAVE_TYPE_OF_TOPIC_SET_SUCCESS';
export const SAVE_TYPE_OF_TOPIC_SET_ERR = 'SAVE_TYPE_OF_TOPIC_SET_ERR';
export const DELETE_TYPE_OF_TOPIC_SET = 'DELETE_TYPE_OF_TOPIC_SET';
export const DELETE_TYPE_OF_TOPIC_SET_SUCCESS = 'DELETE_TYPE_OF_TOPIC_SET_SUCCESS';
export const DELETE_TYPE_OF_TOPIC_SET_ERR = 'DELETE_TYPE_OF_TOPIC_SET_ERR';
export const UPDATE_TYPE_OF_TOPIC_SET_FOR_EDIT = 'UPDATE_TYPE_OF_TOPIC_SET_FOR_EDIT';

export interface FetchListTypeOfTopicSetPagingAction {
  type: typeof FETCH_LIST_TYPE_OF_TOPIC_SET_PAGING;
  payload: {
    page: number;
    pageSize: number;
    searchKey: string;
  };
}

export interface FetchListTypeOfTopicSetPagingSuccessAction {
  type: typeof FETCH_LIST_TYPE_OF_TOPIC_SET_PAGING_SUCCESS;
  payload: DataTypeOfTopicSetPaging;
}

export interface FetchListTypeOfTopicSetPagingErrorAction {
  type: typeof FETCH_LIST_TYPE_OF_TOPIC_SET_PAGING_ERR;
  payload: string;
}

export interface FetchListTypeOfTopicSetAllAction {
  type: typeof FETCH_LIST_TYPE_OF_TOPIC_SET_ALL;
}

export interface FetchListTypeOfTopicSetAllSuccessAction {
  type: typeof FETCH_LIST_TYPE_OF_TOPIC_SET_ALL_SUCCESS;
  payload: TypeOfTopicSetModel[];
}

export interface FetchListTypeOfTopicSetAllErrorAction {
  type: typeof FETCH_LIST_TYPE_OF_TOPIC_SET_ALL_ERR;
  payload: string;
}

export interface FetchDetailsTypeOfTopicSetAction {
  type: typeof FETCH_DETAILS_TYPE_OF_TOPIC_SET;
  payload: $PropertyType<TypeOfTopicSetModel, 'ID'>;
}

export interface FetchDetailsTypeOfTopicSetSuccessAction {
  type: typeof FETCH_DETAILS_TYPE_OF_TOPIC_SET_SUCCESS;
  payload: TypeOfTopicSetModel;
}

export interface FetchDetailsTypeOfTopicSetErrorAction {
  type: typeof FETCH_DETAILS_TYPE_OF_TOPIC_SET_ERR;
  payload: string;
}

export interface SaveTypeOfTopicSetAction {
  type: typeof SAVE_TYPE_OF_TOPIC_SET;
  payload: TypeOfTopicSetModel;
  page: number;
}

export interface SaveTypeOfTopicSetSuccessAction {
  type: typeof SAVE_TYPE_OF_TOPIC_SET_SUCCESS;
}

export interface SaveTypeOfTopicSetErrorAction {
  type: typeof SAVE_TYPE_OF_TOPIC_SET_ERR;
  payload: string;
}

export interface DeleteTypeOfTopicSetAction {
  type: typeof DELETE_TYPE_OF_TOPIC_SET;
  payload: number;
  page: number;
}

export interface DeleteTypeOfTopicSetSuccessAction {
  type: typeof DELETE_TYPE_OF_TOPIC_SET_SUCCESS;
}

export interface DeleteTypeOfTopicSetErrorAction {
  type: typeof DELETE_TYPE_OF_TOPIC_SET_ERR;
  payload: string;
}

export interface UpdateTypeOfTopicSetForEditAction {
  type: typeof UPDATE_TYPE_OF_TOPIC_SET_FOR_EDIT;
  payload: TypeOfTopicSetModel;
  callback: void;
}

export type TypeOfTopicSetActionTypes =
  | FetchListTypeOfTopicSetPagingAction
  | FetchListTypeOfTopicSetPagingSuccessAction
  | FetchListTypeOfTopicSetPagingErrorAction
  | FetchListTypeOfTopicSetAllAction
  | FetchListTypeOfTopicSetAllSuccessAction
  | FetchListTypeOfTopicSetAllErrorAction
  | FetchDetailsTypeOfTopicSetAction
  | FetchDetailsTypeOfTopicSetSuccessAction
  | FetchDetailsTypeOfTopicSetErrorAction
  | SaveTypeOfTopicSetAction
  | SaveTypeOfTopicSetSuccessAction
  | SaveTypeOfTopicSetErrorAction
  | DeleteTypeOfTopicSetAction
  | DeleteTypeOfTopicSetSuccessAction
  | DeleteTypeOfTopicSetErrorAction
  | UpdateTypeOfTopicSetForEditAction;
