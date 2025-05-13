import { put, takeEvery } from 'redux-saga/effects';
import {
  DELETE_TASK,
  DeleteTaskAction,
  FETCH_DETAILS_TASK,
  FETCH_LIST_TASK_ALL,
  FETCH_LIST_TASK_PAGING,
  FetchDetailsTaskAction,
  FetchListTaskAllAction,
  FetchListTaskPagingAction,
  SAVE_TASK,
  SaveTaskAction,
} from './Types';
import { ApiResponse, apiCall, apiGetCall, apiPostCall } from 'store/saga-effects/api';
import {
  API_ENDPOINT_DELETE_TASK,
  API_ENDPOINT_DETAILS_TASK,
  API_ENDPOINT_LIST_TASK_PAGING,
  API_ENDPOINT_CREATE_TASK,
  prepare,
  API_ENDPOINT_UPDATE_TASK,
  API_ENDPOINT_LIST_TASK_ALL,
} from 'services/Endpoints';
import {
  deleteTaskErr,
  deleteTaskSuccess,
  fetchDetailsTaskErr,
  fetchDetailsTaskSuccess,
  fetchListTaskAllErr,
  fetchListTaskAllSuccess,
  fetchListTaskPaging,
  fetchListTaskPagingErr,
  fetchListTaskPagingSuccess,
  saveTaskErr,
  saveTaskSuccess,
} from './Actions';
import { openNotification } from 'utility/Utility';

function* fetchListTaskPagingSaga(action: FetchListTaskPagingAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_LIST_TASK_PAGING,
        {},
        {
          pageIndex: action.payload.page,
          pageSize: action.payload.pageSize,
          searchKey: action.payload.searchKey
        }),
    );

    if (response.data && response.data.Success) {
      yield put(fetchListTaskPagingSuccess(response.data.Data));
    } else {
      yield put(fetchListTaskPagingErr('Get List Task Failed'));
      openNotification('error', '', 'Get List Task Failed')
    }
  } catch (error) {
    console.log(error);
    yield put(fetchListTaskPagingErr('Get List Task Failed'));
    openNotification('error', '', 'Get List Task Failed')
  }
}

function* fetchListTaskAllSaga(action: FetchListTaskAllAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_LIST_TASK_ALL, {}, {}),
    );

    if (response.data && response.data.Success) {
      yield put(fetchListTaskAllSuccess(response.data.Data.listTask));
    } else {
      yield put(fetchListTaskAllErr('Get List Task For Select Failed'));
      openNotification('error', '', 'Get List Task For Select Failed')
    }
  } catch (error) {
    console.log(error);
    yield put(fetchListTaskAllErr('Get List Task For Select Failed'));
    openNotification('error', '', 'Get List Task For Select Failed')
  }
}

function* fetchDetailsTaskSaga(action: FetchDetailsTaskAction) {
  try {
    if (action.payload) {
      const response: ApiResponse<any> =
        yield apiCall(apiGetCall, prepare(API_ENDPOINT_DETAILS_TASK, { taskID: action.payload }, {}));

      if (response.data && response.data.Success) {
        yield put(fetchDetailsTaskSuccess(response.data.Data));
      } else {
        yield put(fetchDetailsTaskErr('Get Details Task Failed'));
      }
    } else {
      yield put(fetchDetailsTaskErr('Get Details Task Failed'));
    }
  } catch (error) {
    console.log(error);
    yield put(fetchDetailsTaskErr('Get Details Task Failed'));
  }
}

function* saveTaskSaga(action: SaveTaskAction) {
  try {
    const response: ApiResponse<any> =
      yield apiCall(
        apiPostCall,
        !action.payload.ID ? API_ENDPOINT_CREATE_TASK : API_ENDPOINT_UPDATE_TASK,
        !action.payload.ID ? action.payload : { task: action.payload }
      );
    if (response.data && response.data.Success) {
      if (action.page === 1) yield put(fetchListTaskPaging(1, 10, ''))
      yield put(saveTaskSuccess())
      openNotification('success', 'Success', 'Saved successfully')
    } else {
      yield put(saveTaskErr('Save Task Failed'));
      if (response.data && response.data.Message.includes('existed')) {
        openNotification('error', 'Save failed', `Name "${action.payload.Name}" existed`)
      } else {
        openNotification('error', '', 'Save Task Failed')
      }
    }
  } catch (error) {
    console.log(error);
    yield put(saveTaskErr('Save Task Failed'));
    openNotification('error', '', 'Save Task Failed')
  }
}

function* deleteTaskSaga(action: DeleteTaskAction) {
  try {
    const response: ApiResponse<any> =
      yield apiCall(apiPostCall, `${API_ENDPOINT_DELETE_TASK}?taskId=${action.payload}`, {});
    if (response.data && response.data.Success) {
      if (action.page === 1) yield put(fetchListTaskPaging(1, 10, ''))
      yield put(deleteTaskSuccess())
      openNotification('success', 'Success', 'Deleted successfully')
    } else {
      yield put(deleteTaskErr('Delete Task Failed'));
    }
  } catch (error) {
    console.log(error);
    yield put(deleteTaskErr('Delete Task Failed'));
  }
}

export function* watchTaskActions() {
  yield takeEvery(FETCH_LIST_TASK_PAGING, fetchListTaskPagingSaga);
  yield takeEvery(FETCH_LIST_TASK_ALL, fetchListTaskAllSaga);
  yield takeEvery(FETCH_DETAILS_TASK, fetchDetailsTaskSaga);
  yield takeEvery(SAVE_TASK, saveTaskSaga);
  yield takeEvery(DELETE_TASK, deleteTaskSaga);
}
