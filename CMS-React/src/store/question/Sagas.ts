/* eslint-disable require-yield */
import { put, takeEvery } from 'redux-saga/effects';
import {
  prepare,
  API_ENDPOINT_LIST_QUESTION,
  API_ENDPOINT_DETAILS_QUESTION,
  API_ENDPOINT_DELETE_QUESTION,
  API_ENDPOINT_ADD_QUESTION,
  API_ENDPOINT_UPDATE_QUESTION,
  API_ENDPOINT_DOWNLOAD_TEMPLATE_FILL_QUESTION,
  API_ENDPOINT_CREATE_BATCH,
  API_ENDPOINT_CREATE_COMPOSITE_QUESTION,
  API_ENDPOINT_FILTER_QUESTION,
  API_ENDPOINT_FETCH_COMPOSITE_QUESTION_DETAIL,
  API_ENDPOINT_UPDATE_COMPOSITE_QUESTION,
  API_ENDPOINT_DELETE_COMPOSITE_QUESTION,
} from 'services/Endpoints';
import {
  ApiResponse,
  apiCall,
  apiGetCall,
  apiPostCall,
  apiDeleteCall,
  apiPutCall,
  apiGetCallBlob,
} from 'store/saga-effects/api';
import {
  fetchListQuestionSuccess,
  fetchListQuestionErr,
  fetchDetailsQuestionSuccess,
  fetchDetailsQuestionErr,
  deleteQuestionERR,
  deleteQuestionSuccess,
  fetchListQuestion,
  addQuestionError,
  addQuestionSuccess,
  updateQuestionSuccess,
  updateQuestionError,
  fetchDetailsQuestionAction,
  downloadTemplateFillQuestionErr,
  downloadTemplateFillQuestionSuccess,
  downloadTemplateFillQuestion,
  createBatchnError,
  createBatchSuccess,
  createCompositeQuestionSuccess,
  createCompositeQuestionError,
  fetchCompositeQuestionSuccess,
  fetchCompositeQuestionError,
  fetchCompositeQuestion,
  updateCompositeQuestionError,
  updateCompositeQuestionSuccess,
  fetchListCompositeQuestionSuccess,
  deleteCompositeQuestionSuccess,
  filterQuestion,
} from './Actions';
import {
  FetchListQuestionAction,
  FetchDetailsQuestionAction,
  FETCH_LIST_QUESTION,
  QuestionModel,
  DeleteQuestionAction,
  DELETE_QUESTION,
  AddQuestionAction,
  ADD_QUESTION,
  QuestionUpdateWrapModel,
  UPDATE_QUESTION,
  UpdateQuestionAction,
  DownloadTemplateFillQuestionAction,
  DOWNLOAD_TEMPLATE_FILL_QUESTION,
  CreateBatchAction,
  CREATE_BATCH,
  CreateCompositeQuestionAction,
  CREATE_COMPOSITE_QUESTION,
  FilterQuestionAction,
  FILTER_QUESTION,
  FetchCompositeQuestionAction,
  FETCH_COMPOSITE_QUESTION_DETAIL,
  UpdateCompositeQuestionAction,
  UPDATE_COMPOSITE_QUESTION,
  CompositeQuestionModel,
  DELETE_COMPOSITE_QUESTION,
  QuestionApiModel,
  DeleteCompositeQuestionAction,
  FETCH_DETAILS_QUESTION,
} from './Types';
import { openNotification } from 'utility/Utility';

function* fetchListQuestionSaga(action: FetchListQuestionAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(
      apiGetCall,
      prepare(
        API_ENDPOINT_LIST_QUESTION,
        {},
        { searchKey: action.payload.searchKey, pageIndex: action.payload.page, pageSize: action.payload.pageSize },
      ),
    );
    if (response.data) {
      const listWithTotalRow = response.data?.Data?.listQuestionPaging.map((item: QuestionModel) => ({
        ...item,
        totalRow: response.data?.Data?.totalRow,
      }));

      yield put(fetchListQuestionSuccess(listWithTotalRow));
    } else {
      yield put(fetchListQuestionErr('Fetch List Question Error'));
    }
  } catch (error) {
    console.log(error);
    yield put(fetchListQuestionErr('Fetch List Question Error'));
  }
}

function* fetchDetailsQuestion(action: FetchDetailsQuestionAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_DETAILS_QUESTION + `/${action.payload}`, {}, {}),
    );

    if (response.data) {
      yield put(fetchDetailsQuestionSuccess(response.data.Data));
    } else {
      yield put(fetchDetailsQuestionErr('Fetch Details Question Error'));
    }
  } catch (error) {
    console.log(error);
    yield put(fetchDetailsQuestionErr('Fetch Details Question Error'));
  }
}

function* fetchCompositeQuestionDetailSaga(action: FetchCompositeQuestionAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_FETCH_COMPOSITE_QUESTION_DETAIL + `/${action.payload}`, {}, {}),
    );
    if (response.data) {
      yield put(fetchCompositeQuestionSuccess(response.data.Data));
    } else {
      yield put(fetchCompositeQuestionError('Fetch Composite Question Detail Error'));
    }
  } catch (error) {
    console.log(error);
    yield put(fetchCompositeQuestionError('Fetch Composite Question Detail Error'));
  }
}

function* addQuestionSaga(action: AddQuestionAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(apiPostCall, API_ENDPOINT_ADD_QUESTION, { ...action.payload });
    if (response.data && response.data.Success) {
      yield put(addQuestionSuccess());
      if (!action.payload.notShowToastSuccess) {
        yield put(fetchDetailsQuestionAction(response.data.Data.ID));
        openNotification('success', 'Success', 'Saved successfully');
      }
    } else {
      yield put(addQuestionError('Save Question Failed'));
      if (!action.payload.notShowToastSuccess) openNotification('error', '', 'Save Question Failed');
    }
  } catch (error) {
    console.log(error);
    yield put(addQuestionError('Save Question Failed'));
    if (!action.payload.notShowToastSuccess) openNotification('error', '', 'Save Question Failed');
  }
}

function* createCompositeQuestionSaga(action: CreateCompositeQuestionAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(apiPostCall, API_ENDPOINT_CREATE_COMPOSITE_QUESTION, {
      ...action.payload,
    });
    if (response.data && response.data.Success) {
      yield put(createCompositeQuestionSuccess());
      if (action.payload.callbackFunc) {
        if (action.payload.Mode !== 'nextBack') openNotification('success', 'Success', 'Saved successfully');
        action.payload.callbackFunc();
      } else {
        yield put(fetchCompositeQuestion(response.data.Data));
      }
    } else {
      yield put(createCompositeQuestionError('Save Composite Question Failed'));
    }
  } catch (error) {
    console.log(error);
    yield put(createCompositeQuestionError('Save Composite Question Failed'));
  }
}

function* updateCompositeQuestionSaga(action: UpdateCompositeQuestionAction) {
  try {
    console.log('payloaddd: ',action.payload);
    
    const response: ApiResponse<any> = yield apiCall(apiPutCall, API_ENDPOINT_UPDATE_COMPOSITE_QUESTION, {
      ...action.payload,
    });
    if (response.data && response.data.Success) {
      yield put(updateCompositeQuestionSuccess());
      openNotification('success', 'Success', 'Saved successfully');
      if (action.payload.callbackFunc) {
        action.payload.callbackFunc();
      }
      yield put(fetchCompositeQuestion(response.data.Data));
    } else {
      yield put(updateCompositeQuestionError('Save Composite Question Failed'));
    }
  } catch (error) {
    console.log(error);
    yield put(updateCompositeQuestionError('Save Composite Question Failed'));
  }
}

function* downloadTemplateFillQuestionSaga(action: DownloadTemplateFillQuestionAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(
      apiGetCallBlob,
      prepare(API_ENDPOINT_DOWNLOAD_TEMPLATE_FILL_QUESTION, {}, {}),
    );
    if (response.data) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Mẫu Import câu hỏi.xls');
      document.body.appendChild(link);
      link.click();
      link.remove();
      yield put(downloadTemplateFillQuestionSuccess());
    } else {
      yield put(downloadTemplateFillQuestionErr('Download template fill question error'));
      openNotification('error', '', 'Download template fill question error');
    }
  } catch (error) {
    console.log(error);
    yield put(downloadTemplateFillQuestionErr('Download template fill question error'));
    openNotification('error', '', 'Download template fill question error');
  }
}

function* updateQuestionSaga(action: UpdateQuestionAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(apiPutCall, API_ENDPOINT_UPDATE_QUESTION, { ...action.payload });
    if (response.data && response.data.Data && response.data.Success) {
      yield put(updateQuestionSuccess());
      openNotification('success', 'Success', 'Saved successfully');
      yield put(fetchDetailsQuestionAction(response.data.Data));
    } else {
      yield put(updateQuestionError('Save Question Failed'));
      openNotification('error', '', 'Save Question Failed');
    }
  } catch (error) {
    console.log(error);
    yield put(updateQuestionError('Save Question Failed'));
    openNotification('error', '', 'Save Question Failed');
  }
}

function* deleteQuestion(action: DeleteQuestionAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(
      apiDeleteCall,
      `${API_ENDPOINT_DELETE_QUESTION}?questionId=${action.payload.id}`,
      {},
    );
    if (response.data) {
      openNotification('success', 'Success', 'Delete Category Success');
      yield put(deleteQuestionSuccess());
      console.log('action.payload.page: ',action.payload.page);
      
      yield put(filterQuestion({ type: '1',page: action.payload.page } as QuestionApiModel));
    } else {
      yield put(deleteQuestionERR('Delete Question Error'));
    }
  } catch (error) {
    console.log(error);
    yield put(deleteQuestionERR('Delete Question Error'));
  }
}
function* deleteCompositeQuestion(action: DeleteCompositeQuestionAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(
      apiDeleteCall,
      `${API_ENDPOINT_DELETE_COMPOSITE_QUESTION}?questionId=${action.payload.id}`,
      {},
    );
    if (response.data) {
      openNotification('success', 'Success', 'Delete Category Success');
      yield put(deleteCompositeQuestionSuccess());
      yield put(filterQuestion({type: '2',page: action.payload.page} as QuestionApiModel));
    } else {
      yield put(deleteQuestionERR('Delete Question Error'));
    }
  } catch (error) {
    console.log(error);
    yield put(deleteQuestionERR('Delete Question Error'));
  }
}

function* filterQuestionSaga(action: FilterQuestionAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(apiPostCall, API_ENDPOINT_FILTER_QUESTION, {
      pageIndex: action.payload.page || 1,
      ContentQuestion: action.payload.content || undefined,
      QuestionCode: action.payload.code || undefined,
      BatchId: action.payload.id || undefined,
      l1: action.payload.l1 || undefined,
      l2: action.payload.l2 || undefined,
      l3: action.payload.l3 || undefined,
      isCompositeQuestion: action.payload.type == '1' ? 0 : 1 || undefined,
      status: action.payload.status,
    });

    if (response.data) {
      if (action.payload.type == '1') {
        const listWithTotalRow = response.data?.Data?.listQuestionPaging.map((item: QuestionModel) => ({
          ...item,
          totalRow: response.data?.Data?.totalRow,
        }));
        yield put(fetchListQuestionSuccess(listWithTotalRow));
      } else {
        const listWithTotalRow = response.data?.Data?.paginatedQuestions.map((item: CompositeQuestionModel) => ({
          ...item,
          totalRow: response.data?.Data?.totalRow,
        }));
        yield put(fetchListCompositeQuestionSuccess(listWithTotalRow));
      }
    } else {
      yield put(fetchListQuestionErr('Fetch List Question Error'));
    }
  } catch (error) {
    console.log(error);
    yield put(fetchListQuestionErr('Fetch List Question Error'));
  }
}

function* createBatchSaga(action: CreateBatchAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(apiPostCall, API_ENDPOINT_CREATE_BATCH, {});
    if (response.data && response.data.Success) {
      yield put(createBatchSuccess());
      action.payload(response.data.Data);
    } else {
      yield put(createBatchnError('Create batch failed'));
    }
  } catch (error) {
    console.log(error);
    yield put(createBatchnError('Create batch failed'));
  }
}

export function* watchQuestionActions() {
  yield takeEvery(FETCH_LIST_QUESTION, fetchListQuestionSaga);
  yield takeEvery(ADD_QUESTION, addQuestionSaga);
  yield takeEvery(UPDATE_QUESTION, updateQuestionSaga);
  yield takeEvery(FETCH_DETAILS_QUESTION, fetchDetailsQuestion);
  yield takeEvery(DELETE_QUESTION, deleteQuestion);
  yield takeEvery(DELETE_COMPOSITE_QUESTION, deleteCompositeQuestion);
  yield takeEvery(DOWNLOAD_TEMPLATE_FILL_QUESTION, downloadTemplateFillQuestionSaga);
  yield takeEvery(CREATE_BATCH, createBatchSaga);
  yield takeEvery(CREATE_COMPOSITE_QUESTION, createCompositeQuestionSaga);
  yield takeEvery(FILTER_QUESTION, filterQuestionSaga);
  yield takeEvery(FETCH_COMPOSITE_QUESTION_DETAIL, fetchCompositeQuestionDetailSaga);
  yield takeEvery(UPDATE_COMPOSITE_QUESTION, updateCompositeQuestionSaga);
}
