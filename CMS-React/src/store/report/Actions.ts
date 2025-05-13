import { $PropertyType } from 'utility-types';
import {
  ReportExamActionTypes,
  FETCH_LIST_REPORT_EXAM_PAGING,
  FETCH_LIST_REPORT_EXAM_PAGING_ERR,
  FETCH_LIST_REPORT_EXAM_PAGING_SUCCESS,
  DataReportPaging,

} from './Types';

export const fetchListReportExamPaging = (
  page: number,
  pageSize: number,
  classID?: number,
  examtype?: number,
  user?: string,
  from?: string,
  to?: string,
  examName?: string,
  ): ReportExamActionTypes => {
  return {
    type: FETCH_LIST_REPORT_EXAM_PAGING,
    payload: { page, pageSize, classID, examtype, user, from, to, examName },
  };
};

export const fetchListReportExamPagingSuccess = (payload: DataReportPaging): ReportExamActionTypes => {
  return {
    type: FETCH_LIST_REPORT_EXAM_PAGING_SUCCESS,
    payload,
  };
};

export const fetchListReportExamPagingErr = (payload: string): ReportExamActionTypes => {
  return {
    type: FETCH_LIST_REPORT_EXAM_PAGING_ERR,
    payload,
  };
};