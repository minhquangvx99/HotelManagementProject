import { put, takeEvery } from 'redux-saga/effects';
import {
  DELETE_KA,
  DeleteKAAction,
  FETCH_DETAILS_KA,
  FETCH_LIST_KA_ALL,
  FETCH_LIST_KA_PAGING,
  FetchDetailsKAAction,
  FetchListKAAllAction,
  FetchListKAPagingAction,
  SAVE_KA,
  SaveKAAction,
} from './Types';
import { ApiResponse, apiCall, apiGetCall, apiPostCall } from 'store/saga-effects/api';
import {
  API_ENDPOINT_DELETE_KA,
  API_ENDPOINT_DETAILS_KA,
  API_ENDPOINT_LIST_KA_PAGING,
  API_ENDPOINT_CREATE_KA,
  prepare,
  API_ENDPOINT_UPDATE_KA,
  API_ENDPOINT_LIST_KA_ALL,
} from 'services/Endpoints';
import {
  deleteKAErr,
  deleteKASuccess,
  fetchDetailsKAErr,
  fetchDetailsKASuccess,
  fetchListKAAllErr,
  fetchListKAAllSuccess,
  fetchListKAPaging,
  fetchListKAPagingErr,
  fetchListKAPagingSuccess,
  saveKAErr,
  saveKASuccess,
} from './Actions';
import { openNotification } from 'utility/Utility';

function* fetchListKAPagingSaga(action: FetchListKAPagingAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_LIST_KA_PAGING,
        {},
        {
          pageIndex: action.payload.page,
          pageSize: action.payload.pageSize,
          searchKey: action.payload.searchKey
        }),
    );

    if (response.data && response.data.Success) {
      yield put(fetchListKAPagingSuccess(response.data.Data));
    } else {
      yield put(fetchListKAPagingErr('Get List KA Failed'));
      openNotification('error', '', 'Get List KA Failed')
    }
  } catch (error) {
    console.log(error);
    yield put(fetchListKAPagingErr('Get List KA Failed'));
    openNotification('error', '', 'Get List KA Failed')
  }
}

function* fetchListKAAllSaga(action: FetchListKAAllAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_LIST_KA_ALL, {}, {}),
    );

    if (response.data && response.data.Success) {
      yield put(fetchListKAAllSuccess(response.data.Data.listKA));
    } else {
      yield put(fetchListKAAllErr('Get List KA For Select Failed'));
      openNotification('error', '', 'Get List KA For Select Failed')
    }
  } catch (error) {
    console.log(error);
    yield put(fetchListKAAllErr('Get List KA For Select Failed'));
    openNotification('error', '', 'Get List KA For Select Failed')
  }
}

function* fetchDetailsKASaga(action: FetchDetailsKAAction) {
  try {
    if (action.payload) {
      const response: ApiResponse<any> =
        yield apiCall(apiGetCall, prepare(API_ENDPOINT_DETAILS_KA, { kaID: action.payload }, {}));

      if (response.data && response.data.Success) {
        yield put(fetchDetailsKASuccess(response.data.Data));
      } else {
        yield put(fetchDetailsKAErr('Get Details KA Failed'));
      }
    } else {
      yield put(fetchDetailsKAErr('Get Details KA Failed'));
    }
  } catch (error) {
    console.log(error);
    yield put(fetchDetailsKAErr('Get Details KA Failed'));
  }
}

function* saveKASaga(action: SaveKAAction) {
  try {
    const response: ApiResponse<any> =
      yield apiCall(
        apiPostCall,
        !action.payload.ID ? API_ENDPOINT_CREATE_KA : API_ENDPOINT_UPDATE_KA,
        !action.payload.ID ? action.payload : { ka: action.payload }
      );
    if (response.data && response.data.Success) {
      if (action.page === 1) yield put(fetchListKAPaging(1, 10, ''))
      yield put(saveKASuccess())
      openNotification('success', 'Success', 'Saved successfully')
    } else {
      yield put(saveKAErr('Save KA Failed'));
      if (response.data && response.data.Message.includes('existed')) {
        openNotification('error', 'Save failed', `Name "${action.payload.Name}" existed`)
      } else {
        openNotification('error', '', 'Save KA Failed')
      }
    }
  } catch (error) {
    console.log(error);
    yield put(saveKAErr('Save KA Failed'));
    openNotification('error', '', 'Save KA Failed')
  }
}

function* deleteKASaga(action: DeleteKAAction) {
  try {
    const response: ApiResponse<any> =
      yield apiCall(apiPostCall, `${API_ENDPOINT_DELETE_KA}?kaId=${action.payload}`, {});
    if (response.data && response.data.Success) {
      if (action.page === 1) yield put(fetchListKAPaging(1, 10, ''))
      yield put(deleteKASuccess())
      openNotification('success', 'Success', 'Deleted successfully')
    } else {
      yield put(deleteKAErr('Delete KA Failed'));
    }
  } catch (error) {
    console.log(error);
    yield put(deleteKAErr('Delete KA Failed'));
  }
}

export function* watchKAActions() {
  yield takeEvery(FETCH_LIST_KA_PAGING, fetchListKAPagingSaga);
  yield takeEvery(FETCH_LIST_KA_ALL, fetchListKAAllSaga);
  yield takeEvery(FETCH_DETAILS_KA, fetchDetailsKASaga);
  yield takeEvery(SAVE_KA, saveKASaga);
  yield takeEvery(DELETE_KA, deleteKASaga);
}
