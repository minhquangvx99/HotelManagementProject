import { TopicSetModel } from 'store/topic-set/Types';
import { NullableString } from 'types/Global';
import { $PropertyType } from 'utility-types';

export interface ReportModel {
  ID?: number;
  Class?: NullableString;
  UserName?: NullableString;
  ExamCode?: NullableString;
  Subject?: NullableString;
  StudentName?: NullableString;
  ExamName?: NullableString;
  Time?: Date;
  timeDoing?: number;
  TypeOfTopicSetName?: NullableString;
  NumberOfQuestion?: NullableString;
  Score?: number; 
}

export interface DataReportPaging {
  ListExam?: ReportModel[];
  totalRow?: number;
  pageIndex?: number;
  pageSize?: number;
}

export interface ReportExamState {
  dataPaging?: DataReportPaging;
  dataAll?: ReportModel[];
  loading?: boolean;
  error?: string;
}

export const FETCH_LIST_REPORT_EXAM_PAGING = 'FETCH_LIST_REPORT_EXAM_PAGING';
export const FETCH_LIST_REPORT_EXAM_PAGING_SUCCESS = 'FETCH_LIST_REPORT_EXAM_PAGING_SUCCESS';
export const FETCH_LIST_REPORT_EXAM_PAGING_ERR = 'FETCH_LIST_REPORT_EXAM_PAGING_ERR';
export const FETCH_LIST_REPORT_EXAM_ALL = 'FETCH_LIST_REPORT_EXAM_ALL';
export const FETCH_LIST_REPORT_EXAM_ALL_SUCCESS = 'FETCH_LIST_REPORT_EXAM_ALL_SUCCESS';
export const FETCH_LIST_REPORT_EXAM_ALL_ERR = 'FETCH_LIST_REPORT_EXAM_ALL_ERR';
export interface FetchListReportExamPagingAction {
  type: typeof FETCH_LIST_REPORT_EXAM_PAGING;
  payload: {
    classID?: number,
    examtype?: number,
    user?: string,
    from?: string,
    to?: string,
    examName?: string,
    page: number;
    pageSize: number;
  };
}

export interface FetchListReportExamPagingSuccessAction {
  type: typeof FETCH_LIST_REPORT_EXAM_PAGING_SUCCESS;
  payload: DataReportPaging;
}

export interface FetchListReportExamPagingErrorAction {
  type: typeof FETCH_LIST_REPORT_EXAM_PAGING_ERR;
  payload: string;
}

export interface FetchListReportExamAllAction {
  type: typeof FETCH_LIST_REPORT_EXAM_ALL;
}

export interface FetchListReportExamAllSuccessAction {
  type: typeof FETCH_LIST_REPORT_EXAM_ALL_SUCCESS;
  payload: ReportModel[];
}

export interface FetchListReportExamAllErrorAction {
  type: typeof FETCH_LIST_REPORT_EXAM_ALL_ERR;
  payload: string;
}
export type ReportExamActionTypes =
  | FetchListReportExamPagingAction
  | FetchListReportExamPagingSuccessAction
  | FetchListReportExamPagingErrorAction
  | FetchListReportExamAllAction;
