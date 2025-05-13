import { put, takeEvery } from 'redux-saga/effects';
import {
  CREATE_ROOM,
  CreateRoomAction,
  DELETE_ROOM,
  DeleteRoomAction,
  FETCH_DETAILS_ROOM,
  FETCH_LIST_ROOM_PAGING,
  FetchDetailsRoomAction,
  FetchListRoomPagingAction,
  RoomDetailGetModel,
  UPDATE_ROOM,
  UpdateRoomAction,
} from './Types';
import { ApiResponse, apiCall, apiDeleteCall, apiGetCall, apiPostCall, apiPutCall } from 'store/saga-effects/api';
import {
  API_ENDPOINT_CREATE_ROOM,
  API_ENDPOINT_DELETE_ROOM,
  API_ENDPOINT_DETAILS_ROOM,
  API_ENDPOINT_LIST_ROOM_PAGING,
  API_ENDPOINT_UPDATE_ROOM,
  prepare,
} from 'services/Endpoints';
import {
  createRoomErr,
  createRoomSuccess,
  deleteRoomSetErr,
  deleteRoomSuccess,
  fetchDetailsRoomErr,
  fetchDetailsRoomSuccess,
  fetchListRoomPaging,
  fetchListRoomPagingErr,
  fetchListRoomPagingSuccess,
  updateRoomErr,
  updateRoomSuccess,
} from './Actions';
import { openNotification } from 'utility/Utility';

function* fetchListRoomPagingSaga(action: FetchListRoomPagingAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(
      apiGetCall,
      prepare(
        API_ENDPOINT_LIST_ROOM_PAGING,
        {},
        {
          pageIndex: action.payload.page,
          pageSize: action.payload.pageSize,
          hotelId: action.payload.hotelId,
          codeSearch: action.payload.codeSearch,
          type: action.payload.type,
          status: action.payload.status,
        },
      ),
    );

    if (response.data && response.data.Success) {
      yield put(fetchListRoomPagingSuccess(response.data.Data));
    } else {
      yield put(fetchListRoomPagingErr('Get List Room Failed'));
      openNotification('error', '', 'Get List Task Failed');
    }
  } catch (error) {
    console.log(error);
    yield put(fetchListRoomPagingErr('Get List Room Failed'));
    openNotification('error', '', 'Get List Room Failed');
  }
}

function* fetchDetailsRoomSaga(action: FetchDetailsRoomAction) {
  try {
    if (action.payload) {
      const response: ApiResponse<any> = yield apiCall(
        apiGetCall,
        prepare(API_ENDPOINT_DETAILS_ROOM, {}, { roomID: action.payload }),
      );

      if (response.data && response.data.Success) {
        yield put(fetchDetailsRoomSuccess(response.data.Data));
      } else {
        yield put(fetchDetailsRoomErr('Get Details Room Failed'));
      }
    } else {
      yield put(fetchDetailsRoomSuccess({} as RoomDetailGetModel));
    }
  } catch (error) {
    console.log(error);
    yield put(fetchDetailsRoomErr('Get Details Room Failed'));
  }
}

function* createRoomSaga(action: CreateRoomAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(apiPostCall, API_ENDPOINT_CREATE_ROOM, { ...action.payload });
    if (response.data && response.data.Success) {
      yield put(fetchListRoomPaging(1, 10, 0, '', '', ''));
      yield put(createRoomSuccess());
      openNotification('success', 'Success', 'Saved successfully');
    } else {
      yield put(createRoomErr('Save Room Failed'));
      openNotification('error', '', 'Save Room Failed');
    }
  } catch (error) {
    console.log(error);
    yield put(createRoomErr('Save Room Failed'));
    openNotification('error', '', 'Save Room Failed');
  }
}

function* updateRoomSaga(action: UpdateRoomAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(apiPutCall, API_ENDPOINT_UPDATE_ROOM, { ...action.payload });
    if (response.data && response.data.Data && response.data.Success) {
      yield put(fetchListRoomPaging(1, 10, 0, '', '', ''));
      yield put(updateRoomSuccess());
      openNotification('success', 'Success', 'Saved successfully');
    } else {
      yield put(updateRoomErr('Save Room Failed'));
      openNotification('error', '', 'Save Room Failed');
    }
  } catch (error) {
    console.log(error);
    yield put(updateRoomErr('Save Room Failed'));
    openNotification('error', '', 'Save Room Failed');
  }
}

function* deleteRoom(action: DeleteRoomAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(
      apiDeleteCall,
      `${API_ENDPOINT_DELETE_ROOM}?roomID=${action.payload}`,
      {},
    );
    if (response.data) {
      yield put(fetchListRoomPaging(1, 10, 0, '', '', ''));
      openNotification('success', 'Success', 'Deleted successfully');
      yield put(deleteRoomSuccess());
    } else {
      yield put(deleteRoomSetErr('Deleted failed'));
    }
  } catch (error) {
    console.log(error);
    yield put(deleteRoomSetErr('Delete failed'));
  }
}

export function* watchRoomActions() {
  yield takeEvery(FETCH_LIST_ROOM_PAGING, fetchListRoomPagingSaga);
  yield takeEvery(FETCH_DETAILS_ROOM, fetchDetailsRoomSaga);
  yield takeEvery(CREATE_ROOM, createRoomSaga);
  yield takeEvery(UPDATE_ROOM, updateRoomSaga);
  yield takeEvery(DELETE_ROOM, deleteRoom);
}
