import { put, takeEvery } from 'redux-saga/effects';
import {
  DELETE_TYPE_OF_TOPIC_SET,
  DeleteTypeOfTopicSetAction,
  FETCH_DETAILS_TYPE_OF_TOPIC_SET,
  FETCH_LIST_TYPE_OF_TOPIC_SET_ALL,
  FETCH_LIST_TYPE_OF_TOPIC_SET_PAGING,
  FetchDetailsTypeOfTopicSetAction,
  FetchListTypeOfTopicSetAllAction,
  FetchListTypeOfTopicSetPagingAction,
  SAVE_TYPE_OF_TOPIC_SET,
  SaveTypeOfTopicSetAction,
} from './Types';
import { ApiResponse, apiCall, apiGetCall, apiPostCall } from 'store/saga-effects/api';
import {
  API_ENDPOINT_DELETE_TYPE_OF_TOPIC_SET,
  API_ENDPOINT_DETAILS_TYPE_OF_TOPIC_SET,
  API_ENDPOINT_LIST_TYPE_OF_TOPIC_SET_PAGING,
  API_ENDPOINT_CREATE_TYPE_OF_TOPIC_SET,
  prepare,
  API_ENDPOINT_UPDATE_TYPE_OF_TOPIC_SET,
  API_ENDPOINT_LIST_TYPE_OF_TOPIC_SET_ALL,
} from 'services/Endpoints';
import {
  deleteTypeOfTopicSetErr,
  deleteTypeOfTopicSetSuccess,
  fetchDetailsTypeOfTopicSetErr,
  fetchDetailsTypeOfTopicSetSuccess,
  fetchListTypeOfTopicSetAllErr,
  fetchListTypeOfTopicSetAllSuccess,
  fetchListTypeOfTopicSetPaging,
  fetchListTypeOfTopicSetPagingErr,
  fetchListTypeOfTopicSetPagingSuccess,
  saveTypeOfTopicSetErr,
  saveTypeOfTopicSetSuccess,
} from './Actions';
import { openNotification } from 'utility/Utility';

function* fetchListTypeOfTopicSetPagingSaga(action: FetchListTypeOfTopicSetPagingAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_LIST_TYPE_OF_TOPIC_SET_PAGING,
        {},
        {
          pageIndex: action.payload.page,
          pageSize: action.payload.pageSize,
          searchKey: action.payload.searchKey
        }),
    );

    if (response.data && response.data.Success) {
      yield put(fetchListTypeOfTopicSetPagingSuccess(response.data.Data));
    } else {
      yield put(fetchListTypeOfTopicSetPagingErr('Get List Type Of Topic Set Failed'));
      openNotification('error', '', 'Get List Type Of Topic Set Failed')
    }
  } catch (error) {
    console.log(error);
    yield put(fetchListTypeOfTopicSetPagingErr('Get List Type Of Topic Set Failed'));
    openNotification('error', '', 'Get List Type Of Topic Set Failed')
  }
}

function* fetchListTypeOfTopicSetAllSaga(action: FetchListTypeOfTopicSetAllAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_LIST_TYPE_OF_TOPIC_SET_ALL, {}, {}),
    );

    if (response.data && response.data.Success) {
      yield put(fetchListTypeOfTopicSetAllSuccess(response.data.Data.listTypeOfTopicSet));
    } else {
      yield put(fetchListTypeOfTopicSetAllErr('Get List Type Of Topic Set For Select Failed'));
      openNotification('error', '', 'Get List Type Of Topic Set For Select Failed')
    }
  } catch (error) {
    console.log(error);
    yield put(fetchListTypeOfTopicSetAllErr('Get List Type Of Topic Set For Select Failed'));
    openNotification('error', '', 'Get List Type Of Topic Set For Select Failed')
  }
}

function* fetchDetailsTypeOfTopicSetSaga(action: FetchDetailsTypeOfTopicSetAction) {
  try {
    if (action.payload) {
      const response: ApiResponse<any> =
        yield apiCall(apiGetCall, prepare(API_ENDPOINT_DETAILS_TYPE_OF_TOPIC_SET, { TypeOfTopicSetID: action.payload }, {}));

      if (response.data && response.data.Success) {
        yield put(fetchDetailsTypeOfTopicSetSuccess(response.data.Data));
      } else {
        yield put(fetchDetailsTypeOfTopicSetErr('Get Details Type Of Topic Set Failed'));
      }
    } else {
      yield put(fetchDetailsTypeOfTopicSetErr('Get Details Type Of Topic Set Failed'));
    }
  } catch (error) {
    console.log(error);
    yield put(fetchDetailsTypeOfTopicSetErr('Get Details Type Of Topic Set Failed'));
  }
}

function* saveTypeOfTopicSetSaga(action: SaveTypeOfTopicSetAction) {
  try {
    const response: ApiResponse<any> =
      yield apiCall(
        apiPostCall,
        !action.payload.ID ? API_ENDPOINT_CREATE_TYPE_OF_TOPIC_SET : API_ENDPOINT_UPDATE_TYPE_OF_TOPIC_SET,
        !action.payload.ID ? action.payload : { typeOfTopicSet: action.payload }
      );

    if (response.data && response.data.Success) {
      if (action.page === 1) yield put(fetchListTypeOfTopicSetPaging(1, 10, ''))
      yield put(saveTypeOfTopicSetSuccess())
      openNotification('success', 'Success', 'Saved successfully')
    } else {
      yield put(saveTypeOfTopicSetErr('Save Type Of Topic Set Failed'));
      if (response.data && response.data.Message.includes('existed')) {
        openNotification('error', 'Save failed', `Name "${action.payload.Name}" existed`)
      } else {
        openNotification('error', '', 'Save Type Of Topic Set Failed')
      }
    }
  } catch (error) {
    console.log(error);
    yield put(saveTypeOfTopicSetErr('Save Type Of Topic Set Failed'));
    openNotification('error', '', 'Save Type Of Topic Set Failed')
  }
}

function* deleteTypeOfTopicSetSaga(action: DeleteTypeOfTopicSetAction) {
  try {
    const response: ApiResponse<any> =
      yield apiCall(apiPostCall, `${API_ENDPOINT_DELETE_TYPE_OF_TOPIC_SET}?typeOfTopicSetId=${action.payload}`, {});
    if (response.data && response.data.Success) {
      if (action.page === 1) yield put(fetchListTypeOfTopicSetPaging(1, 10, ''))
      yield put(deleteTypeOfTopicSetSuccess())
      openNotification('success', 'Success', 'Deleted successfully')
    } else {
      yield put(deleteTypeOfTopicSetErr('Delete Type Of Topic Set Failed'));
    }
  } catch (error) {
    console.log(error);
    yield put(deleteTypeOfTopicSetErr('Delete Type Of Topic Set Failed'));
  }
}

export function* watchTypeOfTopicSetActions() {
  yield takeEvery(FETCH_LIST_TYPE_OF_TOPIC_SET_PAGING, fetchListTypeOfTopicSetPagingSaga);
  yield takeEvery(FETCH_LIST_TYPE_OF_TOPIC_SET_ALL, fetchListTypeOfTopicSetAllSaga);
  yield takeEvery(FETCH_DETAILS_TYPE_OF_TOPIC_SET, fetchDetailsTypeOfTopicSetSaga);
  yield takeEvery(SAVE_TYPE_OF_TOPIC_SET, saveTypeOfTopicSetSaga);
  yield takeEvery(DELETE_TYPE_OF_TOPIC_SET, deleteTypeOfTopicSetSaga);
}
