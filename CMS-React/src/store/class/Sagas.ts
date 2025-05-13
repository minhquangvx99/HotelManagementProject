import { put, takeEvery } from 'redux-saga/effects';
import { ApiResponse, apiCall, apiGetCall, apiPostCall } from 'store/saga-effects/api';
import { fetchDetailsClassSuccess, fetchDetailsClassErr, fetchListClassPagingSuccess, fetchListClassPagingErr, fetchListClassAllSuccess, fetchListClassAllErr, fetchListClassPaging, saveClassSuccess, saveClassErr, deleteClassSuccess, deleteClassErr } from './Actions';
import {
  DELETE_CLASS,
  DeleteClassAction,
  FETCH_DETAILS_CLASS,
  FETCH_LIST_CLASS_ALL,
  FETCH_LIST_CLASS_PAGING,
  FetchDetailsClassAction,
  FetchListClassAllAction,
  FetchListClassPagingAction,
  SAVE_CLASS,
  SaveClassAction,
} from './Types'
import { openNotification } from 'utility/Utility';
import { API_ENDPOINT_CREATE_CLASS, API_ENDPOINT_DELETE_CLASS, API_ENDPOINT_DETAILS_CLASS, API_ENDPOINT_LIST_CLASS_ALL, API_ENDPOINT_LIST_CLASS_PAGING, API_ENDPOINT_UPDATE_CLASS, prepare } from 'services/Endpoints';

function* fetchListClassPagingSaga(action: FetchListClassPagingAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_LIST_CLASS_PAGING,
        {},
        {
          pageIndex: action.payload.page,
          pageSize: action.payload.pageSize,
          searchKey: action.payload.searchKey
        }),
    );

    if (response.data && response.data.Success) {
      yield put(fetchListClassPagingSuccess(response.data.Data));
    } else {
      yield put(fetchListClassPagingErr('Get List Class Failed'));
      openNotification('error', '', 'Get List Class Failed')
    }
  } catch (error) {
    console.log(error);
    yield put(fetchListClassPagingErr('Get List Class Failed'));
    openNotification('error', '', 'Get List Class Failed')
  }
}

function* fetchListClassAllSaga(action: FetchListClassAllAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_LIST_CLASS_ALL, {}, {}),
    );

    if (response.data && response.data.Success) {
      yield put(fetchListClassAllSuccess(response.data.Data));
    } else {
      yield put(fetchListClassAllErr('Get List Class For Select Failed'));
      openNotification('error', '', 'Get List Class For Select Failed')
    }
  } catch (error) {
    console.log(error);
    yield put(fetchListClassAllErr('Get List Class For Select Failed'));
    openNotification('error', '', 'Get List Class For Select Failed')
  }
}

function* fetchDetailsClassSaga(action: FetchDetailsClassAction) {
  try {
    if (action.payload) {
      const response: ApiResponse<any> =
        yield apiCall(apiGetCall, prepare(API_ENDPOINT_DETAILS_CLASS, { ClassID: action.payload }, {}));

      if (response.data && response.data.Success) {
        yield put(fetchDetailsClassSuccess(response.data.Data));
      } else {
        yield put(fetchDetailsClassErr('Get Details Class Failed'));
      }
    } else {
      yield put(fetchDetailsClassErr('Get Details Class Failed'));
    }
  } catch (error) {
    console.log(error);
    yield put(fetchDetailsClassErr('Get Details Class Failed'));
  }
}

function* saveClassSaga(action: SaveClassAction) {
  try {
    const response: ApiResponse<any> =
      yield apiCall(
        apiPostCall,
        !action.payload.ID ? API_ENDPOINT_CREATE_CLASS : API_ENDPOINT_UPDATE_CLASS,
        !action.payload.ID ? action.payload : { ...action.payload }
      );

    if (response.data && response.data.Success) {
      if (action.page === 1) yield put(fetchListClassPaging(1, 10, ''))
      yield put(saveClassSuccess())
      openNotification('success', 'Success', 'Saved successfully')
    } else {
      yield put(saveClassErr('Save Class Failed'));
      openNotification('error', '', 'Save Class Failed')
    }
  } catch (error) {
    console.log(error);
    yield put(saveClassErr('Save Class Failed'));
    openNotification('error', '', 'Save Class Failed')
  }
}

function* deleteClassSaga(action: DeleteClassAction) {
  try {
    const response: ApiResponse<any> = 
      yield apiCall(apiPostCall, `${API_ENDPOINT_DELETE_CLASS}?classId=${action.payload}`, {});

    if (response.data && response.data.Success) {
      if (action.page === 1) yield put(fetchListClassPaging(1, 10, ''))
      yield put(deleteClassSuccess())
      openNotification('success', 'Success', 'Deleted successfully')
    } else {
      yield put(deleteClassErr('Delete Class Failed'));
    }
  } catch (error) {
    console.log(error);
    yield put(deleteClassErr('Delete Class Failed'));
  }
}

export function* watchClassActions() {
  yield takeEvery(FETCH_LIST_CLASS_PAGING, fetchListClassPagingSaga);
  yield takeEvery(FETCH_LIST_CLASS_ALL, fetchListClassAllSaga);
  yield takeEvery(FETCH_DETAILS_CLASS, fetchDetailsClassSaga);
  yield takeEvery(SAVE_CLASS, saveClassSaga);
  yield takeEvery(DELETE_CLASS, deleteClassSaga);
}
