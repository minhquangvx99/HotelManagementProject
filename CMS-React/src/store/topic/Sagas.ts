import { put, takeEvery } from 'redux-saga/effects';
import { prepare, API_ENDPOINT_LIST_TOPIC, API_ENDPOINT_DETAILS_TOPIC } from 'services/Endpoints';
import { ApiResponse, apiCall, apiGetCall, apiPostCall } from 'store/saga-effects/api';
import { fetchListTopicSuccess, fetchListTopicErr, fetchDetailsTopicSuccess, fetchDetailsTopicErr } from './Actions';
import { FetchListTopicAction, FetchDetailsTopicAction } from './Types';

function* fetchListTopic(action: FetchListTopicAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(apiGetCall, prepare(API_ENDPOINT_LIST_TOPIC, {}, {}));

    if (response.data) {
      yield put(fetchListTopicSuccess(response.data));
    } else {
      yield put(fetchListTopicErr('Fetch List Topic Error'));
    }
  } catch (error) {
    console.log(error);
    yield put(fetchListTopicErr('Fetch List Topic Error'));
  }
}

function* fetchDetailsTopic(action: FetchDetailsTopicAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(apiPostCall, API_ENDPOINT_DETAILS_TOPIC, { id: action.payload });

    if (response.data) {
      yield put(fetchDetailsTopicSuccess(response.data));
    } else {
      yield put(fetchDetailsTopicErr('Fetch Details Topic Error'));
    }
  } catch (error) {
    console.log(error);
    yield put(fetchDetailsTopicErr('Fetch Details Topic Error'));
  }
}

export function* watchTopicActions() {
  yield takeEvery(API_ENDPOINT_LIST_TOPIC, fetchListTopic);
  yield takeEvery(API_ENDPOINT_DETAILS_TOPIC, fetchDetailsTopic);
}
