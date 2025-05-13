import { put, takeEvery } from 'redux-saga/effects';
import { ApiResponse, apiCall, apiGetCall, apiPostCall } from 'store/saga-effects/api';
import { fetchDetailsHotelSuccess, fetchDetailsHotelErr, fetchListHotelPagingSuccess, fetchListHotelPagingErr, fetchListHotelAllSuccess, fetchListHotelAllErr, fetchListHotelPaging, saveHotelSuccess, saveHotelErr, deleteHotelSuccess, deleteHotelErr } from './Actions';
import {
  DELETE_HOTEL,
  DeleteHotelAction,
  FETCH_DETAILS_HOTEL,
  FETCH_LIST_HOTEL_ALL,
  FETCH_LIST_HOTEL_PAGING,
  FetchDetailsHotelAction,
  FetchListHotelAllAction,
  FetchListHotelPagingAction,
  SAVE_HOTEL,
  SaveHotelAction,
} from './Types'
import { openNotification } from 'utility/Utility';
import { API_ENDPOINT_CREATE_HOTEL, API_ENDPOINT_DELETE_HOTEL, API_ENDPOINT_DETAILS_HOTEL, API_ENDPOINT_LIST_HOTEL_ALL, API_ENDPOINT_LIST_HOTEL_PAGING, API_ENDPOINT_UPDATE_HOTEL, prepare } from 'services/Endpoints';

function* fetchListHotelPagingSaga(action: FetchListHotelPagingAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_LIST_HOTEL_PAGING,
        {},
        {
          pageIndex: action.payload.page,
          pageSize: action.payload.pageSize,
          searchKey: action.payload.searchKey
        }),
    );

    if (response.data && response.data.Success) {
      yield put(fetchListHotelPagingSuccess(response.data.Data));
    } else {
      yield put(fetchListHotelPagingErr('Get List Hotel Failed'));
      openNotification('error', '', 'Get List Hotel Failed')
    }
  } catch (error) {
    console.log(error);
    yield put(fetchListHotelPagingErr('Get List Hotel Failed'));
    openNotification('error', '', 'Get List Hotel Failed')
  }
}

function* fetchListHotelAllSaga(action: FetchListHotelAllAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_LIST_HOTEL_ALL, {}, {}),
    );

    if (response.data && response.data.Success) {
      yield put(fetchListHotelAllSuccess(response.data.Data));
    } else {
      yield put(fetchListHotelAllErr('Get List Hotel For Select Failed'));
      openNotification('error', '', 'Get List Hotel For Select Failed')
    }
  } catch (error) {
    console.log(error);
    yield put(fetchListHotelAllErr('Get List Hotel For Select Failed'));
    openNotification('error', '', 'Get List Hotel For Select Failed')
  }
}

function* fetchDetailsHotelSaga(action: FetchDetailsHotelAction) {
  try {
    if (action.payload) {
      const response: ApiResponse<any> =
        yield apiCall(apiGetCall, prepare(API_ENDPOINT_DETAILS_HOTEL, { HotelID: action.payload }, {}));

      if (response.data && response.data.Success) {
        yield put(fetchDetailsHotelSuccess(response.data.Data));
      } else {
        yield put(fetchDetailsHotelErr('Get Details Hotel Failed'));
      }
    } else {
      yield put(fetchDetailsHotelErr('Get Details Hotel Failed'));
    }
  } catch (error) {
    console.log(error);
    yield put(fetchDetailsHotelErr('Get Details Hotel Failed'));
  }
}

function* saveHotelSaga(action: SaveHotelAction) {
  try {
    const response: ApiResponse<any> =
      yield apiCall(
        apiPostCall,
        !action.payload.ID ? API_ENDPOINT_CREATE_HOTEL : API_ENDPOINT_UPDATE_HOTEL,
        !action.payload.ID ? action.payload : { ...action.payload }
      );

    if (response.data && response.data.Success) {
      if (action.page === 1) yield put(fetchListHotelPaging(1, 10, ''))
      yield put(saveHotelSuccess())
      openNotification('success', 'Success', 'Saved successfully')
    } else {
      yield put(saveHotelErr('Save Hotel Failed'));
      openNotification('error', '', 'Save Hotel Failed')
    }
  } catch (error) {
    console.log(error);
    yield put(saveHotelErr('Save Hotel Failed'));
    openNotification('error', '', 'Save Hotel Failed')
  }
}

function* deleteHotelSaga(action: DeleteHotelAction) {
  try {
    const response: ApiResponse<any> = 
      yield apiCall(apiPostCall, `${API_ENDPOINT_DELETE_HOTEL}?hotelId=${action.payload}`, {});

    if (response.data && response.data.Success) {
      if (action.page === 1) yield put(fetchListHotelPaging(1, 10, ''))
      yield put(deleteHotelSuccess())
      openNotification('success', 'Success', 'Deleted successfully')
    } else {
      yield put(deleteHotelErr('Delete Hotel Failed'));
    }
  } catch (error) {
    console.log(error);
    yield put(deleteHotelErr('Delete Hotel Failed'));
  }
}

export function* watchHotelActions() {
  yield takeEvery(FETCH_LIST_HOTEL_PAGING, fetchListHotelPagingSaga);
  yield takeEvery(FETCH_LIST_HOTEL_ALL, fetchListHotelAllSaga);
  yield takeEvery(FETCH_DETAILS_HOTEL, fetchDetailsHotelSaga);
  yield takeEvery(SAVE_HOTEL, saveHotelSaga);
  yield takeEvery(DELETE_HOTEL, deleteHotelSaga);
}
