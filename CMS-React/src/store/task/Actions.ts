import { $PropertyType } from 'utility-types';
import {
  TaskModel,
  TaskActionTypes,
  FETCH_DETAILS_TASK,
  FETCH_DETAILS_TASK_ERR,
  FETCH_DETAILS_TASK_SUCCESS,
  FETCH_LIST_TASK_PAGING,
  FETCH_LIST_TASK_PAGING_ERR,
  FETCH_LIST_TASK_PAGING_SUCCESS,
  SAVE_TASK,
  SAVE_TASK_ERR,
  DELETE_TASK,
  DELETE_TASK_ERR,
  UPDATE_TASK_FOR_EDIT,
  FETCH_LIST_TASK_ALL,
  FETCH_LIST_TASK_ALL_ERR,
  FETCH_LIST_TASK_ALL_SUCCESS,
  DataTaskPaging,
  DELETE_TASK_SUCCESS,
  SAVE_TASK_SUCCESS,
} from './Types';

export const fetchListTaskPaging = (page: number, pageSize: number, searchKey: string): TaskActionTypes => {
  return {
    type: FETCH_LIST_TASK_PAGING,
    payload: { page, pageSize, searchKey },
  };
};

export const fetchListTaskPagingSuccess = (payload: DataTaskPaging): TaskActionTypes => {
  return {
    type: FETCH_LIST_TASK_PAGING_SUCCESS,
    payload,
  };
};

export const fetchListTaskPagingErr = (payload: string): TaskActionTypes => {
  return {
    type: FETCH_LIST_TASK_PAGING_ERR,
    payload,
  };
};

export const fetchListTaskAll = (): TaskActionTypes => {
  return {
    type: FETCH_LIST_TASK_ALL,
  };
};

export const fetchListTaskAllSuccess = (payload: TaskModel[]): TaskActionTypes => {
  return {
    type: FETCH_LIST_TASK_ALL_SUCCESS,
    payload,
  };
};

export const fetchListTaskAllErr = (payload: string): TaskActionTypes => {
  return {
    type: FETCH_LIST_TASK_ALL_ERR,
    payload,
  };
};

export const fetchDetailsTask = (payload: $PropertyType<TaskModel, 'ID'>): TaskActionTypes => {
  return {
    type: FETCH_DETAILS_TASK,
    payload,
  };
};

export const fetchDetailsTaskSuccess = (payload: TaskModel): TaskActionTypes => {
  return {
    type: FETCH_DETAILS_TASK_SUCCESS,
    payload,
  };
};

export const fetchDetailsTaskErr = (payload: string): TaskActionTypes => {
  return {
    type: FETCH_DETAILS_TASK_ERR,
    payload,
  };
};

export const saveTask = (payload: TaskModel, page: number): TaskActionTypes => {
  return {
    type: SAVE_TASK,
    payload,
    page
  };
};

export const saveTaskSuccess = (): TaskActionTypes => {
  return {
    type: SAVE_TASK_SUCCESS,
  };
};

export const saveTaskErr = (payload: string): TaskActionTypes => {
  return {
    type: SAVE_TASK_ERR,
    payload,
  };
};

export const deleteTask = (payload: number, page: number): TaskActionTypes => {
  return {
    type: DELETE_TASK,
    payload,
    page
  };
};

export const deleteTaskSuccess = (): TaskActionTypes => {
  return {
    type: DELETE_TASK_SUCCESS,
  };
};


export const deleteTaskErr = (payload: string): TaskActionTypes => {
  return {
    type: DELETE_TASK_ERR,
    payload,
  };
};

export const updateTaskForEdit = (payload: TaskModel, callback: void): TaskActionTypes => {
  return {
    type: UPDATE_TASK_FOR_EDIT,
    payload,
    callback
  };
};
