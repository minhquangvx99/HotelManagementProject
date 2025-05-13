import { put, takeEvery } from 'redux-saga/effects';
import {
  DELETE_EXAM_TYPE,
  DeleteExamTypeAction,
  FETCH_DETAILS_EXAM_TYPE,
  FETCH_LIST_EXAM_TYPE_ALL,
  FETCH_LIST_EXAM_TYPE_DROP_LIST,
  FETCH_LIST_EXAM_TYPE_PAGING,
  FetchDetailsExamTypeAction,
  FetchListExamTypeAllAction,
  FetchListExamTypeDropListAction,
  FetchListExamTypePagingAction,
  SAVE_EXAM_TYPE,
  SaveExamTypeAction,
} from './Types';
import { ApiResponse, apiCall, apiGetCall, apiPostCall } from 'store/saga-effects/api';
import {
  API_ENDPOINT_DELETE_EXAM_TYPE,
  API_ENDPOINT_DETAILS_EXAM_TYPE,
  API_ENDPOINT_LIST_EXAM_TYPE_PAGING,
  API_ENDPOINT_CREATE_EXAM_TYPE,
  prepare,
  API_ENDPOINT_UPDATE_EXAM_TYPE,
  API_ENDPOINT_LIST_EXAM_TYPE_ALL,
  API_ENDPOINT_LIST_EXAM_TYPE_DROP_LIST,
} from 'services/Endpoints';
import {
  deleteExamTypeErr,
  deleteExamTypeSuccess,
  fetchDetailsExamTypeErr,
  fetchDetailsExamTypeSuccess,
  fetchListExamTypeAllErr,
  fetchListExamTypeAllSuccess,
  fetchListExamTypeDropListSuccess,
  fetchListExamTypeDropListErr,
  fetchListExamTypePaging,
  fetchListExamTypePagingErr,
  fetchListExamTypePagingSuccess,
  saveExamTypeErr,
  saveExamTypeSuccess,
} from './Actions';
import { openNotification } from 'utility/Utility';

function* fetchListExamTypePagingSaga(action: FetchListExamTypePagingAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_LIST_EXAM_TYPE_PAGING,
        {},
        {
          pageIndex: action.payload.page,
          pageSize: action.payload.pageSize,
          searchKey: action.payload.searchKey
        }),
    ); 

    if (response.data && response.data.Success) {
      yield put(fetchListExamTypePagingSuccess(response.data.Data));
    } else {
      yield put(fetchListExamTypePagingErr('Get List Exam Type Failed'));
      openNotification('error', '', 'Get List Exam Type Failed')
    }
  } catch (error) {
    console.log(error);
    yield put(fetchListExamTypePagingErr('Get List Exam Type Failed'));
    openNotification('error', '', 'Get List Exam Type Failed')
  }
}

function* fetchListExamTypeDropListSaga(action: FetchListExamTypeDropListAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_LIST_EXAM_TYPE_DROP_LIST + '/' + action.userID + '/' + action.examTypeID,
        {},
        {
        }),
    ); 

    if (response.data && response.data.Success) {
      yield put(fetchListExamTypeDropListSuccess(response.data.Data.listExamType));
    } else {
      yield put(fetchListExamTypeDropListErr('Get List Exam Type Failed'));
      openNotification('error', '', 'Get List Exam Type Failed')
    }
  } catch (error) {
    console.log(error);
    yield put(fetchListExamTypeDropListErr('Get List Exam Type Failed'));
    openNotification('error', '', 'Get List Exam Type Failed')
  }
}

function* fetchListExamTypeAllSaga(action: FetchListExamTypeAllAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_LIST_EXAM_TYPE_ALL, {}, {}),
    );

    
    if (response.data && response.data.Success) {
      yield put(fetchListExamTypeAllSuccess(response.data.Data.listExamType));
    } else {
      yield put(fetchListExamTypeAllErr('Get List Exam Type For Select Failed'));
      openNotification('error', '', 'Get List Exam Type For Select Failed')
    }
  } catch (error) {
    console.log(error);
    yield put(fetchListExamTypeAllErr('Get List Exam Type For Select Failed'));
    openNotification('error', '', 'Get List Exam Type For Select Failed')
  }
}


function* fetchDetailsExamTypeSaga(action: FetchDetailsExamTypeAction) {
  try {
    if (action.payload) {
      const response: ApiResponse<any> =
        yield apiCall(apiGetCall, prepare(API_ENDPOINT_DETAILS_EXAM_TYPE, { examTypeID: action.payload }, {}));

      if (response.data && response.data.Success) {
        yield put(fetchDetailsExamTypeSuccess(response.data.Data));
      } else {
        yield put(fetchDetailsExamTypeErr('Get Details Exam Type Failed'));
      }
    } else {
      yield put(fetchDetailsExamTypeErr('Get Details Exam Type Failed'));
    }
  } catch (error) {
    console.log(error);
    yield put(fetchDetailsExamTypeErr('Get Details Exam Type Failed'));
  }
}

function* saveExamTypeSaga(action: SaveExamTypeAction) {
  try {
    const response: ApiResponse<any> =
      yield apiCall(
        apiPostCall,
        !action.payload.ID ? API_ENDPOINT_CREATE_EXAM_TYPE : API_ENDPOINT_UPDATE_EXAM_TYPE,
        !action.payload.ID ? action.payload : { examType: action.payload }
      );

    if (response.data && response.data.Success) {
      if (action.page === 1) yield put(fetchListExamTypePaging(1, 10, ''))
      yield put(saveExamTypeSuccess())
      openNotification('success', 'Success', 'Saved successfully')
    } else {
      yield put(saveExamTypeErr('Save Exam Type Failed'));
      openNotification('error', '', 'Save Exam Type Failed')
    }
  } catch (error) {
    console.log(error);
    yield put(saveExamTypeErr('Save Exam Type Failed'));
    openNotification('error', '', 'Save Exam Type Failed')
  }
}

function* deleteExamTypeSaga(action: DeleteExamTypeAction) {
  try {
    const response: ApiResponse<any> = 
      yield apiCall(apiPostCall, `${API_ENDPOINT_DELETE_EXAM_TYPE}?examTypeId=${action.payload}`, {});

    if (response.data && response.data.Success) {
      if (action.page === 1) yield put(fetchListExamTypePaging(1, 10, ''))
      yield put(deleteExamTypeSuccess())
      openNotification('success', 'Success', 'Deleted successfully')
    } else {
      yield put(deleteExamTypeErr('Delete Exam Type Failed'));
    }
  } catch (error) {
    console.log(error);
    yield put(deleteExamTypeErr('Delete Exam Type Failed'));
  }
}

export function* watchExamTypeActions() {
  yield takeEvery(FETCH_LIST_EXAM_TYPE_PAGING, fetchListExamTypePagingSaga);
  yield takeEvery(FETCH_LIST_EXAM_TYPE_ALL, fetchListExamTypeAllSaga);
  yield takeEvery(FETCH_LIST_EXAM_TYPE_DROP_LIST, fetchListExamTypeDropListSaga);
  yield takeEvery(FETCH_DETAILS_EXAM_TYPE, fetchDetailsExamTypeSaga);
  yield takeEvery(SAVE_EXAM_TYPE, saveExamTypeSaga);
  yield takeEvery(DELETE_EXAM_TYPE, deleteExamTypeSaga);
}
