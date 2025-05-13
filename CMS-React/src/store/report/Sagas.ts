import { put, takeEvery } from 'redux-saga/effects';
import {
  
  FETCH_LIST_REPORT_EXAM_ALL,
  FETCH_LIST_REPORT_EXAM_PAGING,
  FetchListReportExamPagingAction,
} from './Types';
import { ApiResponse, apiCall, apiGetCall, apiPostCall } from 'store/saga-effects/api';
import {
  API_ENDPOINT_LIST_REPORT_EXAM,
  prepare,
} from 'services/Endpoints';
import {
  fetchListReportExamPagingErr,
  fetchListReportExamPagingSuccess,
} from './Actions';
import { openNotification } from 'utility/Utility';

function* fetchListReportExamPagingSaga(action: FetchListReportExamPagingAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_LIST_REPORT_EXAM,
        {},
        {
          classID: action.payload.classID,
          examtype: action.payload.examtype,
          user: action.payload.user,
          from: action.payload.from,
          to: action.payload.to,
          examName: action.payload.examName,
          pageIndex: action.payload.page,
          pageSize: action.payload.pageSize,
         
        }),
    );

    if (response.data && response.data.Success) {
      console.log('Report',response.data);
      
      yield put(fetchListReportExamPagingSuccess(response.data.Data));
    } else {
      yield put(fetchListReportExamPagingErr('Get List Type Of Topic Set Failed'));
      openNotification('error', '', 'Get List Type Of Topic Set Failed')
    }
  } catch (error) {
    console.log(error);
    yield put(fetchListReportExamPagingErr('Get List Type Of Topic Set Failed'));
    openNotification('error', '', 'Get List Type Of Topic Set Failed')
  }
}

export function* watchReportActions() {
  yield takeEvery(FETCH_LIST_REPORT_EXAM_PAGING, fetchListReportExamPagingSaga);
}
