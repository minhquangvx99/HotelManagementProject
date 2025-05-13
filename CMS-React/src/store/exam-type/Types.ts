import { ExamTypeStudentModel } from 'store/exam-type-student/Type';
import { KAModel } from 'store/ka/Types';
import { NullableString } from 'types/Global';
import { $PropertyType } from 'utility-types';

export interface ExamTypeModel {
  ID?: number;
  Name?: NullableString;
  ExamType?: NullableString;
  kas?: KAModel[];
  examTypeStudents?: ExamTypeStudentModel[];
}

export interface DataExamTypePaging {
  listExamType?: ExamTypeModel[];
  totalRow?: number;
  pageIndex?: number;
  pageSize?: number;
}

export interface ExamTypeState {
  dataPaging?: DataExamTypePaging;
  dataAll?: ExamTypeModel[];
  dataDropList?: ExamTypeModel[];
  examTypeForEdit?: ExamTypeModel;
  loading?: boolean;
  error?: string;
}

export const FETCH_LIST_EXAM_TYPE_PAGING = 'FETCH_LIST_EXAM_TYPE_PAGING';
export const FETCH_LIST_EXAM_TYPE_PAGING_SUCCESS = 'FETCH_LIST_EXAM_TYPE_PAGING_SUCCESS';
export const FETCH_LIST_EXAM_TYPE_PAGING_ERR = 'FETCH_LIST_EXAM_TYPE_PAGING_ERR';
export const FETCH_LIST_EXAM_TYPE_ALL = 'FETCH_LIST_EXAM_TYPE_ALL';
export const FETCH_LIST_EXAM_TYPE_DROP_LIST = 'FETCH_LIST_EXAM_TYPE_DROP_LIST';
export const FETCH_LIST_EXAM_TYPE_ALL_SUCCESS = 'FETCH_LIST_EXAM_TYPE_ALL_SUCCESS';
export const FETCH_LIST_EXAM_TYPE_DROP_LIST_SUCCESS = 'FETCH_LIST_EXAM_TYPE_DROP_LIST_SUCCESS';
export const FETCH_LIST_EXAM_TYPE_DROP_LIST_ERR = 'FETCH_LIST_EXAM_TYPE_DROP_LIST_ERR';
export const FETCH_LIST_EXAM_TYPE_ALL_ERR = 'FETCH_LIST_EXAM_TYPE_ALL_ERR';
export const FETCH_DETAILS_EXAM_TYPE = 'FETCH_DETAILS_EXAM_TYPE';
export const FETCH_DETAILS_EXAM_TYPE_SUCCESS = 'FETCH_DETAILS_EXAM_TYPE_SUCCESS';
export const FETCH_DETAILS_EXAM_TYPE_ERR = 'FETCH_DETAILS_EXAM_TYPE_ERR';
export const SAVE_EXAM_TYPE = 'SAVE_EXAM_TYPE';
export const SAVE_EXAM_TYPE_SUCCESS = 'SAVE_EXAM_TYPE_SUCCESS';
export const SAVE_EXAM_TYPE_ERR = 'SAVE_EXAM_TYPE_ERR';
export const DELETE_EXAM_TYPE_SUCCESS = 'DELETE_EXAM_TYPE_SUCCESS';
export const DELETE_EXAM_TYPE = 'DELETE_EXAM_TYPE';
export const DELETE_EXAM_TYPE_ERR = 'DELETE_EXAM_TYPE_ERR';
export const UPDATE_EXAM_TYPE_FOR_EDIT = 'UPDATE_EXAM_TYPE_FOR_EDIT';

export interface FetchListExamTypePagingAction {
  type: typeof FETCH_LIST_EXAM_TYPE_PAGING;
  payload: {
    page: number;
    pageSize: number;
    searchKey: string;
  };
}

export interface FetchListExamTypePagingSuccessAction {
  type: typeof FETCH_LIST_EXAM_TYPE_PAGING_SUCCESS;
  payload: DataExamTypePaging;
}

export interface FetchListExamTypePagingErrorAction {
  type: typeof FETCH_LIST_EXAM_TYPE_PAGING_ERR;
  payload: string;
}

export interface FetchListExamTypeAllAction {
  type: typeof FETCH_LIST_EXAM_TYPE_ALL;
}
export interface FetchListExamTypeDropListAction {
  type: typeof FETCH_LIST_EXAM_TYPE_DROP_LIST;
   userID: number;
   examTypeID : number

}
export interface FetchListExamTypeDropListSuccessAction {
  type: typeof FETCH_LIST_EXAM_TYPE_DROP_LIST_SUCCESS;
  payload: ExamTypeModel[];
}

export interface FetchListExamTypeDropListErrorAction {
  type: typeof FETCH_LIST_EXAM_TYPE_DROP_LIST_ERR;
  payload: string;
}

export interface FetchListExamTypeAllSuccessAction {
  type: typeof FETCH_LIST_EXAM_TYPE_ALL_SUCCESS;
  payload: ExamTypeModel[];
}

export interface FetchListExamTypeAllErrorAction {
  type: typeof FETCH_LIST_EXAM_TYPE_ALL_ERR;
  payload: string;
}

export interface FetchDetailsExamTypeAction {
  type: typeof FETCH_DETAILS_EXAM_TYPE;
  payload: $PropertyType<ExamTypeModel, 'ID'>;
}

export interface FetchDetailsExamTypeSuccessAction {
  type: typeof FETCH_DETAILS_EXAM_TYPE_SUCCESS;
  payload: ExamTypeModel;
}

export interface FetchDetailsExamTypeErrorAction {
  type: typeof FETCH_DETAILS_EXAM_TYPE_ERR;
  payload: string;
}

export interface SaveExamTypeAction {
  type: typeof SAVE_EXAM_TYPE;
  payload: ExamTypeModel;
  page: number;
}

export interface SaveExamTypeSuccessAction {
  type: typeof SAVE_EXAM_TYPE_SUCCESS;
}

export interface SaveExamTypeErrorAction {
  type: typeof SAVE_EXAM_TYPE_ERR;
  payload: string;
}

export interface DeleteExamTypeAction {
  type: typeof DELETE_EXAM_TYPE;
  payload: number;
  page: number;
}

export interface DeleteExamTypeSuccessAction {
  type: typeof DELETE_EXAM_TYPE_SUCCESS;
}

export interface DeleteExamTypeErrorAction {
  type: typeof DELETE_EXAM_TYPE_ERR;
  payload: string;
}

export interface UpdateExamTypeForEditAction {
  type: typeof UPDATE_EXAM_TYPE_FOR_EDIT;
  payload: ExamTypeModel;
  callback: void;
}

export type ExamTypeActionTypes =
  | FetchListExamTypePagingAction
  | FetchListExamTypePagingSuccessAction
  | FetchListExamTypePagingErrorAction
  | FetchListExamTypeAllAction
  | FetchListExamTypeDropListAction
  | FetchListExamTypeDropListSuccessAction
  | FetchListExamTypeDropListErrorAction
  | FetchListExamTypeAllSuccessAction
  | FetchListExamTypeAllErrorAction
  | FetchDetailsExamTypeAction
  | FetchDetailsExamTypeSuccessAction
  | FetchDetailsExamTypeErrorAction
  | SaveExamTypeAction
  | SaveExamTypeSuccessAction
  | SaveExamTypeErrorAction
  | DeleteExamTypeAction
  | DeleteExamTypeSuccessAction
  | DeleteExamTypeErrorAction
  | UpdateExamTypeForEditAction;
