import { put, takeEvery } from 'redux-saga/effects';
import { FETCH_LIST_BATCH_ID, GetBatchIDAction } from './Types';
import { apiCall, apiPostCall, ApiResponse } from 'store/saga-effects/api';
import { API_ENDPOINT_LIST_BATCH_ID } from 'services/Endpoints';
import { fetchListBatchID, fetchListBatchIDSuccess } from './Action';

function* getBatchID(action: GetBatchIDAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(apiPostCall, API_ENDPOINT_LIST_BATCH_ID, {});
    if (response.data) {
      //   if (action.page === 1) yield put(fetchListClassPaging(1, 10, ''))
      //   yield put(deleteClassSuccess())
      //   openNotification('success', 'Success', 'Deleted successfully')
      yield put(fetchListBatchIDSuccess(response?.data?.Data?.listBIRaw));
    } else {
      //   yield put(deleteClassErr('Delete Class Failed'));
    }
  } catch (error) {
    console.log(error);
    // yield put(deleteClassErr('Delete Class Failed'));
  }
}

export function* watchBatchActions() {
  yield takeEvery(FETCH_LIST_BATCH_ID, getBatchID);
}
