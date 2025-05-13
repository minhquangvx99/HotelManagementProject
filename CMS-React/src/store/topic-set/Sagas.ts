// import { put, takeEvery } from 'redux-saga/effects';
// import {
//   CREATE_TOPICSET,
//   CreateTopicSetAction,
//   DELETE_TOPICSET,
//   DeleteTopicSetAction,
//   FETCH_DETAILS_TOPICSET,
//   FETCH_LIST_QUESTION_IN_TOPICSET_BY_EXAMTYPEID,
//   FETCH_LIST_TOPICSET_PAGING,
//   FetchDetailsTopicSetAction,
//   FetchListQuestionInTopicSetByExamTypeIDAction,
//   FetchListTopicSetPagingAction,
//   UPDATE_STATUS_OF_TOPICSET,
//   UPDATE_TOPICSET,
//   UpdateStatusOfTopicSetAction,
//   UpdateTopicSetAction,
// } from './Types';
// import { ApiResponse, apiCall, apiDeleteCall, apiGetCall, apiPostCall, apiPutCall } from 'store/saga-effects/api';
// import {
//   API_ENDPOINT_CREATE_TOPIC_SET,
//   API_ENDPOINT_DELETE_TOPIC_SET,
//   API_ENDPOINT_DETAILS_TOPIC_SET,
//   API_ENDPOINT_LIST_TOPIC_SET_BY_EXAMTYPEID,
//   API_ENDPOINT_LIST_TOPIC_SET_PAGING,
//   API_ENDPOINT_UPDATE_STATUS_OF_TOPIC_SET,
//   API_ENDPOINT_UPDATE_TOPIC_SET,
//   prepare,
// } from 'services/Endpoints';
// import {
//   createTopicSetErr,
//   createTopicSetSuccess,
//   deleteTopicSetSetErr,
//   deleteTopicSetSuccess,
//   fetchDetailsTopicSetErr,
//   fetchDetailsTopicSetSuccess,
//   fetchListQuestionInTopicSetByExamTypeIDErr,
//   fetchListQuestionInTopicSetByExamTypeIDSuccess,
//   fetchListTopicSetPaging,
//   fetchListTopicSetPagingErr,
//   fetchListTopicSetPagingSuccess,
//   updateStatusOfTopicSetErr,
//   updateStatusOfTopicSetSuccess,
//   updateTopicSetErr,
//   updateTopicSetSuccess,
// } from './Actions';
// import { openNotification } from 'utility/Utility';

// function* fetchListTopicSetPagingSaga(action: FetchListTopicSetPagingAction) {
//   try {
//     const response: ApiResponse<any> = yield apiCall(
//       apiGetCall,
//       prepare(
//         API_ENDPOINT_LIST_TOPIC_SET_PAGING,
//         {},
//         {
//           pageIndex: action.payload.page,
//           pageSize: action.payload.pageSize,
//           searchKey: action.payload.searchKey,
//           examTypeID: action.payload.examTypeID,
//           typeOfTopicSetsID: action.payload.typeOfTopicSetsID,
//           codeSearch: action.payload.codeSearch,
//           name: action.payload.name,
//           status: action.payload.status,
//         },
//       ),
//     );

//     if (response.data && response.data.Success) {
//       yield put(fetchListTopicSetPagingSuccess(response.data.Data));
//     } else {
//       yield put(fetchListTopicSetPagingErr('Get List TopicSet Failed'));
//       openNotification('error', '', 'Get List Task Failed');
//     }
//   } catch (error) {
//     console.log(error);
//     yield put(fetchListTopicSetPagingErr('Get List TopicSet Failed'));
//     openNotification('error', '', 'Get List TopicSet Failed');
//   }
// }

// function* fetchDetailsTopicSetSaga(action: FetchDetailsTopicSetAction) {
//   try {
//     if (action.payload) {
//       const response: ApiResponse<any> = yield apiCall(
//         apiGetCall,
//         prepare(API_ENDPOINT_DETAILS_TOPIC_SET, {}, { topicSetID: action.payload }),
//       );

//       if (response.data && response.data.Success) {
//         yield put(fetchDetailsTopicSetSuccess(response.data.Data));
//       } else {
//         yield put(fetchDetailsTopicSetErr('Get Details TopicSet Failed'));
//       }
//     } else {
//       yield put(fetchDetailsTopicSetErr('Get Details TopicSet Failed'));
//     }
//   } catch (error) {
//     console.log(error);
//     yield put(fetchDetailsTopicSetErr('Get Details TopicSet Failed'));
//   }
// }

// function* fetchListQuestionInTopicSetByExamTypeIDSaga(action: FetchListQuestionInTopicSetByExamTypeIDAction) {
//   try {
//     const response: ApiResponse<any> = yield apiCall(
//       apiGetCall,
//       prepare(API_ENDPOINT_LIST_TOPIC_SET_BY_EXAMTYPEID + `/${action.payload}`, {}, {}),
//     );

//     if (response.data && response.data.Success) {
//       yield put(fetchListQuestionInTopicSetByExamTypeIDSuccess(response.data.Data));
//     } else {
//       yield put(fetchListTopicSetPagingErr('Get List TopicSet by examTypeID Failed'));

//       openNotification('error', '', 'Get List TopicSet by examTypeID Failed');
//     }
//   } catch (error) {
//     console.log(error);
//     yield put(fetchListQuestionInTopicSetByExamTypeIDErr('Get List TopicSet by examTypeID Failed'));
//     openNotification('error', '', 'Get List TopicSet by examTypeID Failed');
//   }
// }

// function* createTopicSetSaga(action: CreateTopicSetAction) {
//   try {
//     const response: ApiResponse<any> = yield apiCall(apiPostCall, API_ENDPOINT_CREATE_TOPIC_SET, { ...action.payload });
//     if (response.data && response.data.Success) {
//       yield put(fetchListTopicSetPaging(1, 10, '', 0, 0, '', '', ''));
//       yield put(createTopicSetSuccess());
//       openNotification('success', 'Success', 'Saved successfully');
//     } else {
//       yield put(createTopicSetErr('Save TopicSet Failed'));
//       openNotification('error', '', 'Save TopicSet Failed');
//     }
//   } catch (error) {
//     console.log(error);
//     yield put(createTopicSetErr('Save TopicSet Failed'));
//     openNotification('error', '', 'Save TopicSet Failed');
//   }
// }

// function* updateTopicSetSaga(action: UpdateTopicSetAction) {
//   try {
//     const response: ApiResponse<any> = yield apiCall(apiPutCall, API_ENDPOINT_UPDATE_TOPIC_SET, { ...action.payload });
//     if (response.data && response.data.Data && response.data.Success) {
//       yield put(updateTopicSetSuccess());
//       openNotification('success', 'Success', 'Saved successfully');
//     } else {
//       yield put(updateTopicSetErr('Save TopicSet Failed'));
//       openNotification('error', '', 'Save TopicSet Failed');
//     }
//   } catch (error) {
//     console.log(error);
//     yield put(updateTopicSetErr('Save TopicSet Failed'));
//     openNotification('error', '', 'Save TopicSet Failed');
//   }
// }

// function* updateStatusOfTopicSetSaga(action: UpdateStatusOfTopicSetAction) {
//   try {
//     const response: ApiResponse<any> = yield apiCall(
//       apiPutCall,
//       API_ENDPOINT_UPDATE_STATUS_OF_TOPIC_SET +
//         `?topicSetID=${action.payload.topicSetID}&topicSetStatus=${action.payload.topicSetStatus}`,
//       {},
//     );
//     if (response.data && response.data.Data && response.data.Success) {
//       yield put(fetchListTopicSetPaging(action.payload.page ?? 1, 10, '', 0, 0, '', '', ''));
//       yield put(updateStatusOfTopicSetSuccess());
//       openNotification('success', 'Success', `Update status successfully`);
//     } else {
//       yield put(updateStatusOfTopicSetErr('Update status failed'));
//       openNotification('error', '', 'Update status failed');
//     }
//   } catch (error) {
//     console.log(error);
//     yield put(updateStatusOfTopicSetErr('Update status failed'));
//     openNotification('error', '', 'Update status failed');
//   }
// }

// function* deleteTopicSet(action: DeleteTopicSetAction) {
//   try {
//     const response: ApiResponse<any> = yield apiCall(
//       apiDeleteCall,
//       `${API_ENDPOINT_DELETE_TOPIC_SET}?topicSetID=${action.payload}`,
//       {},
//     );
//     if (response.data) {
//       openNotification('success', 'Success', 'Deleted successfully');
//       yield put(deleteTopicSetSuccess());
//       yield put(fetchListTopicSetPaging(1, 10, '', 0, 0, '', '', ''));
//     } else {
//       yield put(deleteTopicSetSetErr('Deleted failed'));
//     }
//   } catch (error) {
//     console.log(error);
//     yield put(deleteTopicSetSetErr('Delete failed'));
//   }
// }

// export function* watchTopicSetActions() {
//   yield takeEvery(FETCH_LIST_TOPICSET_PAGING, fetchListTopicSetPagingSaga);
//   yield takeEvery(FETCH_DETAILS_TOPICSET, fetchDetailsTopicSetSaga);
//   yield takeEvery(FETCH_LIST_QUESTION_IN_TOPICSET_BY_EXAMTYPEID, fetchListQuestionInTopicSetByExamTypeIDSaga);
//   yield takeEvery(CREATE_TOPICSET, createTopicSetSaga);
//   yield takeEvery(UPDATE_TOPICSET, updateTopicSetSaga);
//   yield takeEvery(UPDATE_STATUS_OF_TOPICSET, updateStatusOfTopicSetSaga);
//   yield takeEvery(DELETE_TOPICSET, deleteTopicSet);
// }
