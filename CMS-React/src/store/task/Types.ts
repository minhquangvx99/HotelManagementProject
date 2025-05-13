import { ExamTypeModel } from 'store/exam-type/Types';
import { KAModel } from 'store/ka/Types';
import { QuestionModel } from 'store/question/Types';
import { NullableString } from 'types/Global';
import { $PropertyType } from 'utility-types';

export interface TaskModel {
  ID?: number;
  Name?: NullableString;
  KAID?: number;
  ka?: KAModel;
  examType?: ExamTypeModel;
  questions?: QuestionModel[];
}

export interface DataTaskPaging {
  listTask?: TaskModel[];
  totalRow?: number;
  pageIndex?: number;
  pageSize?: number;
}

export interface TaskState {
  dataPaging?: DataTaskPaging;
  dataAll?: TaskModel[];
  taskForEdit?: TaskModel;
  loading?: boolean;
  error?: string;
}

export const FETCH_LIST_TASK_PAGING = 'FETCH_LIST_TASK_PAGING';
export const FETCH_LIST_TASK_PAGING_SUCCESS = 'FETCH_LIST_TASK_PAGING_SUCCESS';
export const FETCH_LIST_TASK_PAGING_ERR = 'FETCH_LIST_TASK_PAGING_ERR';
export const FETCH_LIST_TASK_ALL = 'FETCH_LIST_TASK_ALL';
export const FETCH_LIST_TASK_ALL_SUCCESS = 'FETCH_LIST_TASK_ALL_SUCCESS';
export const FETCH_LIST_TASK_ALL_ERR = 'FETCH_LIST_TASK_ALL_ERR';
export const FETCH_DETAILS_TASK = 'FETCH_DETAILS_TASK';
export const FETCH_DETAILS_TASK_SUCCESS = 'FETCH_DETAILS_TASK_SUCCESS';
export const FETCH_DETAILS_TASK_ERR = 'FETCH_DETAILS_TASK_ERR';
export const SAVE_TASK = 'SAVE_TASK';
export const SAVE_TASK_SUCCESS = 'SAVE_TASK_SUCCESS';
export const SAVE_TASK_ERR = 'SAVE_TASK_ERR';
export const DELETE_TASK = 'DELETE_TASK';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_ERR = 'DELETE_TASK_ERR';
export const UPDATE_TASK_FOR_EDIT = 'UPDATE_TASK_FOR_EDIT';

export interface FetchListTaskPagingAction {
  type: typeof FETCH_LIST_TASK_PAGING;
  payload: {
    page: number;
    pageSize: number;
    searchKey: string;
  };
}

export interface FetchListTaskPagingSuccessAction {
  type: typeof FETCH_LIST_TASK_PAGING_SUCCESS;
  payload: DataTaskPaging;
}

export interface FetchListTaskPagingErrorAction {
  type: typeof FETCH_LIST_TASK_PAGING_ERR;
  payload: string;
}

export interface FetchListTaskAllAction {
  type: typeof FETCH_LIST_TASK_ALL;
}

export interface FetchListTaskAllSuccessAction {
  type: typeof FETCH_LIST_TASK_ALL_SUCCESS;
  payload: TaskModel[];
}

export interface FetchListTaskAllErrorAction {
  type: typeof FETCH_LIST_TASK_ALL_ERR;
  payload: string;
}

export interface FetchDetailsTaskAction {
  type: typeof FETCH_DETAILS_TASK;
  payload: $PropertyType<TaskModel, 'ID'>;
}

export interface FetchDetailsTaskSuccessAction {
  type: typeof FETCH_DETAILS_TASK_SUCCESS;
  payload: TaskModel;
}

export interface FetchDetailsTaskErrorAction {
  type: typeof FETCH_DETAILS_TASK_ERR;
  payload: string;
}

export interface SaveTaskAction {
  type: typeof SAVE_TASK;
  payload: TaskModel;
  page: number;
}

export interface SaveTaskSuccessAction {
  type: typeof SAVE_TASK_SUCCESS;
}

export interface SaveTaskErrorAction {
  type: typeof SAVE_TASK_ERR;
  payload: string;
}

export interface DeleteTaskAction {
  type: typeof DELETE_TASK;
  payload: number;
  page: number;
}

export interface DeleteTaskSuccessAction {
  type: typeof DELETE_TASK_SUCCESS;
}

export interface DeleteTaskErrorAction {
  type: typeof DELETE_TASK_ERR;
  payload: string;
}

export interface UpdateTaskForEditAction {
  type: typeof UPDATE_TASK_FOR_EDIT;
  payload: TaskModel;
  callback: void;
}

export type TaskActionTypes =
  | FetchListTaskPagingAction
  | FetchListTaskPagingSuccessAction
  | FetchListTaskPagingErrorAction
  | FetchListTaskAllAction
  | FetchListTaskAllSuccessAction
  | FetchListTaskAllErrorAction
  | FetchDetailsTaskAction
  | FetchDetailsTaskSuccessAction
  | FetchDetailsTaskErrorAction
  | SaveTaskAction
  | SaveTaskSuccessAction
  | SaveTaskErrorAction
  | DeleteTaskAction
  | DeleteTaskSuccessAction
  | DeleteTaskErrorAction
  | UpdateTaskForEditAction;
