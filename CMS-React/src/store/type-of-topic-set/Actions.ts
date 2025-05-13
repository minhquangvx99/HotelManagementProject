import { $PropertyType } from 'utility-types';
import {
  TypeOfTopicSetModel,
  TypeOfTopicSetActionTypes,
  FETCH_DETAILS_TYPE_OF_TOPIC_SET,
  FETCH_DETAILS_TYPE_OF_TOPIC_SET_ERR,
  FETCH_DETAILS_TYPE_OF_TOPIC_SET_SUCCESS,
  FETCH_LIST_TYPE_OF_TOPIC_SET_PAGING,
  FETCH_LIST_TYPE_OF_TOPIC_SET_PAGING_ERR,
  FETCH_LIST_TYPE_OF_TOPIC_SET_PAGING_SUCCESS,
  SAVE_TYPE_OF_TOPIC_SET,
  SAVE_TYPE_OF_TOPIC_SET_ERR,
  DELETE_TYPE_OF_TOPIC_SET,
  DELETE_TYPE_OF_TOPIC_SET_ERR,
  UPDATE_TYPE_OF_TOPIC_SET_FOR_EDIT,
  FETCH_LIST_TYPE_OF_TOPIC_SET_ALL,
  FETCH_LIST_TYPE_OF_TOPIC_SET_ALL_ERR,
  FETCH_LIST_TYPE_OF_TOPIC_SET_ALL_SUCCESS,
  DataTypeOfTopicSetPaging,
  DELETE_TYPE_OF_TOPIC_SET_SUCCESS,
  SAVE_TYPE_OF_TOPIC_SET_SUCCESS,
} from './Types';

export const fetchListTypeOfTopicSetPaging = (page: number, pageSize: number, searchKey: string): TypeOfTopicSetActionTypes => {
  return {
    type: FETCH_LIST_TYPE_OF_TOPIC_SET_PAGING,
    payload: { page, pageSize, searchKey },
  };
};

export const fetchListTypeOfTopicSetPagingSuccess = (payload: DataTypeOfTopicSetPaging): TypeOfTopicSetActionTypes => {
  return {
    type: FETCH_LIST_TYPE_OF_TOPIC_SET_PAGING_SUCCESS,
    payload,
  };
};

export const fetchListTypeOfTopicSetPagingErr = (payload: string): TypeOfTopicSetActionTypes => {
  return {
    type: FETCH_LIST_TYPE_OF_TOPIC_SET_PAGING_ERR,
    payload,
  };
};

export const fetchListTypeOfTopicSetAll = (): TypeOfTopicSetActionTypes => {
  return {
    type: FETCH_LIST_TYPE_OF_TOPIC_SET_ALL,
  };
};

export const fetchListTypeOfTopicSetAllSuccess = (payload: TypeOfTopicSetModel[]): TypeOfTopicSetActionTypes => {
  return {
    type: FETCH_LIST_TYPE_OF_TOPIC_SET_ALL_SUCCESS,
    payload,
  };
};

export const fetchListTypeOfTopicSetAllErr = (payload: string): TypeOfTopicSetActionTypes => {
  return {
    type: FETCH_LIST_TYPE_OF_TOPIC_SET_ALL_ERR,
    payload,
  };
};

export const fetchDetailsTypeOfTopicSet = (payload: $PropertyType<TypeOfTopicSetModel, 'ID'>): TypeOfTopicSetActionTypes => {
  return {
    type: FETCH_DETAILS_TYPE_OF_TOPIC_SET,
    payload,
  };
};

export const fetchDetailsTypeOfTopicSetSuccess = (payload: TypeOfTopicSetModel): TypeOfTopicSetActionTypes => {
  return {
    type: FETCH_DETAILS_TYPE_OF_TOPIC_SET_SUCCESS,
    payload,
  };
};

export const fetchDetailsTypeOfTopicSetErr = (payload: string): TypeOfTopicSetActionTypes => {
  return {
    type: FETCH_DETAILS_TYPE_OF_TOPIC_SET_ERR,
    payload,
  };
};

export const saveTypeOfTopicSet = (payload: TypeOfTopicSetModel, page: number): TypeOfTopicSetActionTypes => {
  return {
    type: SAVE_TYPE_OF_TOPIC_SET,
    payload,
    page
  };
};

export const saveTypeOfTopicSetSuccess = (): TypeOfTopicSetActionTypes => {
  return {
    type: SAVE_TYPE_OF_TOPIC_SET_SUCCESS,
  };
};

export const saveTypeOfTopicSetErr = (payload: string): TypeOfTopicSetActionTypes => {
  return {
    type: SAVE_TYPE_OF_TOPIC_SET_ERR,
    payload,
  };
};

export const deleteTypeOfTopicSet = (payload: number, page: number): TypeOfTopicSetActionTypes => {
  return {
    type: DELETE_TYPE_OF_TOPIC_SET,
    payload,
    page
  };
};

export const deleteTypeOfTopicSetSuccess = (): TypeOfTopicSetActionTypes => {
  return {
    type: DELETE_TYPE_OF_TOPIC_SET_SUCCESS,
  };
};

export const deleteTypeOfTopicSetErr = (payload: string): TypeOfTopicSetActionTypes => {
  return {
    type: DELETE_TYPE_OF_TOPIC_SET_ERR,
    payload,
  };
};

export const updateTypeOfTopicSetForEdit = (payload: TypeOfTopicSetModel, callback: void): TypeOfTopicSetActionTypes => {
  return {
    type: UPDATE_TYPE_OF_TOPIC_SET_FOR_EDIT,
    payload,
    callback
  };
};
