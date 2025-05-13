import { apiCall, apiGetCall, apiPostCall, apiPutCall, ApiResponse } from "store/saga-effects/api";
import { CREATE_NOTIFICATION_TOKEN, CreateNotificationTokenAction, FETCH_LIST_NOTIFICATION_MESSAGE_BY_USER_ID, FetchListNotificationMessageByUserIDAction, READ_ALL_NOTIFICATION_MESSAGE_BY_USER_ID, READ_NOTIFICATION_MESSAGE_BY_ID, ReadAllNotificationMessageByUserIDAction, ReadNotificationMessageByIDAction } from "./Types";
import { API_ENDPOINT_CREATE_NOTIFICATION_TOKEN, API_ENDPOINT_FETCH_LIST_NOTIFICATION_MESSAGE_BY_USER_ID, API_ENDPOINT_READ_ALL_NOTIFICATION_MESSAGE_BY_USER_ID, API_ENDPOINT_READ_NOTIFICATION_MESSAGE_BY_ID, prepare } from "services/Endpoints";
import { createNotificationTokenError, createNotificationTokenSuccess, fetchListNotificationMessageByUserID, fetchListNotificationMessageByUserIDError, fetchListNotificationMessageByUserIDSuccess, readAllNotificationMessageByUserIDError, readAllNotificationMessageByUserIDSuccess, readNotificationMessageByIDError, readNotificationMessageByIDSuccess } from "./Actions";
import { put, takeEvery } from "redux-saga/effects";
import { openNotification } from "utility/Utility";


function* createNotificationTokenSaga(action: CreateNotificationTokenAction) {
    try {
      const response: ApiResponse<any> =
        yield apiCall(apiPostCall, API_ENDPOINT_CREATE_NOTIFICATION_TOKEN, { ...action.payload });
      if (response.data && response.data.Success) {
        yield put(createNotificationTokenSuccess())
        // openNotification('success', 'Success', 'Create user_token successfully')
      } else {
        yield put(createNotificationTokenError('Create user_token Failed'));
        // openNotification('error', '', 'Save Question Failed')
      }
    } catch (error) {
      console.log(error);
      yield put(createNotificationTokenError('Create user_token Failed'));
    //   openNotification('error', '', 'Save Question Failed')
    }
  }


  function* fetchListNotificationMessageByUserIDSaga(action: FetchListNotificationMessageByUserIDAction) {
    try {
      const response: ApiResponse<any> = yield apiCall(apiGetCall, prepare(API_ENDPOINT_FETCH_LIST_NOTIFICATION_MESSAGE_BY_USER_ID+`/${action.payload}`, {}, {}));
      if (response.data) {
        yield put(fetchListNotificationMessageByUserIDSuccess(response.data.Data));
      } else {
        yield put(fetchListNotificationMessageByUserIDError('Fetch List NotificationMessage Error'));
      }
    } catch (error) {
      console.log(error);
      yield put(fetchListNotificationMessageByUserIDError('Fetch List NotificationMessage Error'));
    }
  }

  function* readAllNotificationMessageByUserIDSaga(action: ReadAllNotificationMessageByUserIDAction) {
    try {
      const response: ApiResponse<any> =
        yield apiCall(apiPutCall, API_ENDPOINT_READ_ALL_NOTIFICATION_MESSAGE_BY_USER_ID+`/${action.payload}`, {});
      if (response.data && response.data.Success) {
        yield put(readAllNotificationMessageByUserIDSuccess())
        yield put(fetchListNotificationMessageByUserID(action.payload))
        // openNotification('success', 'Success', 'Saved successfully')
      } else {
        yield put(readAllNotificationMessageByUserIDError('Read All Notification Failed'));
        openNotification('error', '', 'Read All Notification Failed')
      }
    } catch (error) {
      console.log(error);
      yield put(readAllNotificationMessageByUserIDError('Read All Notification Failed'));
      openNotification('error', '', 'Read All Notification Failed')
    }
  }

  function* readNotificationMessageByIDSaga(action: ReadNotificationMessageByIDAction) {
    try {
      const response: ApiResponse<any> =
        yield apiCall(apiPutCall, API_ENDPOINT_READ_NOTIFICATION_MESSAGE_BY_ID+`/${action.payload.notiID}`, {});
      if (response.data && response.data.Success) {
        yield put(readNotificationMessageByIDSuccess())
        yield put(fetchListNotificationMessageByUserID(action.payload.userID))
        // openNotification('success', 'Success', 'Saved successfully')
      } else {
        yield put(readNotificationMessageByIDError('Read Notification Failed'));
        openNotification('error', '', 'Read Notification Failed')
      }
    } catch (error) {
      console.log(error);
      yield put(readNotificationMessageByIDError('Read Notification Failed'));
      openNotification('error', '', 'Read Notification Failed')
    }
  }


export function* watchNotificationActions() {
  yield takeEvery(CREATE_NOTIFICATION_TOKEN, createNotificationTokenSaga);
  yield takeEvery(FETCH_LIST_NOTIFICATION_MESSAGE_BY_USER_ID, fetchListNotificationMessageByUserIDSaga);
  yield takeEvery(READ_ALL_NOTIFICATION_MESSAGE_BY_USER_ID, readAllNotificationMessageByUserIDSaga);
  yield takeEvery(READ_NOTIFICATION_MESSAGE_BY_ID, readNotificationMessageByIDSaga);
}