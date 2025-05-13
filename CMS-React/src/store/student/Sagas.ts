import { put, takeEvery } from 'redux-saga/effects';
import { ApiResponse, apiCall, apiGetCall, apiPostCall } from 'store/saga-effects/api';
import {
  fetchDetailsStudentSuccess,
  fetchDetailsStudentErr,
  fetchListStudentPagingSuccess,
  fetchListStudentPagingErr,
  fetchListStudentPaging,
  deleteStudentSuccess,
  deleteStudentErr,
  addOrUpdateStudentSuccess,
  addOrUpdateStudentErr,
  fetchListExamTypeStudentPagingSuccess,
  fetchListExamTypeStudentPagingErr,
  addOrUpdateExamTypeStudentSuccess,
  addOrUpdateExamTypeStudentErr,
  deleteExamTypeStudentSuccess,
  deleteExamTypeStudentErr,
  fetchListExamTypeStudentPaging,
  fetchDetailsStudent,
  updateStatusStudentSuccess,
  updateStatusStudentErr,
  passDetailsStudent,
  resetPasswordErr,
  resetPasswordSuccess,
  approveSuccess,
  approveErr,
  refuseSuccess,
  refuseErr,
  createAccountSuccess,
  createAccountErr,
} from './Actions';
import {
  DELETE_STUDENT,
  DeleteStudentAction,
  FETCH_DETAILS_STUDENT,
  FETCH_LIST_STUDENT_PAGING,
  FetchDetailsStudentAction,
  FetchListStudentPagingAction,
  ADD_UPDATE_STUDENT,
  AddOrUpdateStudentAction,
  FetchListExamTypeStudentPagingAction,
  FETCH_LIST_EXAMTYPESTUDENT_PAGING,
  AddUpdateExamTypeStudentAction,
  DeleteExamTypeStudentAction,
  ADD_UPDATE_EXAMTYPESTUDENT,
  DELETE_EXAMTYPESTUDENT,
  UpdateStatusStudentAction,
  UPDATE_STATUS_STUDENT,
  ResetPasswordAction,
  RESET_PASSWORD,
  ApproveAction,
  APPROVE,
  RefuseAction,
  REFUSE,
  CreateAccountAction,
  CREATEACCOUNT,
} from './Types';
import { openNotification } from 'utility/Utility';
import {
  API_ENDPOINT_APPROVE,
  API_ENDPOINT_CREATE_UPDATE_EXAMTYPESTUDENT,
  API_ENDPOINT_CREATE_UPDATE_STUDENT,
  API_ENDPOINT_DELETE_EXAMTYPESTUDENT,
  API_ENDPOINT_DELETE_STUDENT,
  API_ENDPOINT_DETAILS_STUDENT,
  API_ENDPOINT_LIST_STUDENT_PAGING,
  API_ENDPOINT_MAIL_CREATE_ACCOUNT,
  API_ENDPOINT_REFUSE,
  API_ENDPOINT_RESET_PASSWORD,
  API_ENDPOINT_UPDATE_STATUS_STUDENT,
  API_GET_EXAMTYPE_STUDENT,
  prepare,
} from 'services/Endpoints';
import { start } from 'repl';

function* fetchListStudentPagingSaga(action: FetchListStudentPagingAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(
      apiGetCall,
      prepare(
        API_ENDPOINT_LIST_STUDENT_PAGING,
        {},
        {
          emailSearch: action.payload.emailSearch,
          status: action.payload.status,
          startDate: action.payload.startDate,
          endDate: action.payload.endDate,
          pageIndex: action.payload.page,
          pageSize: action.payload.pageSize,
        },
      ),
    );

    if (response.data && response.data.Success) {
      yield put(fetchListStudentPagingSuccess(response.data.Data));
    } else {
      yield put(fetchListStudentPagingErr('Get List Student Failed'));
      openNotification('error', '', 'Get List Student Failed');
    }
  } catch (error) {
    console.log(error);
    yield put(fetchListStudentPagingErr('Get List Student Failed'));
    openNotification('error', '', 'Get List Student Failed');
  }
}

function* fetchDetailsStudentSaga(action: FetchDetailsStudentAction) {
  try {
    if (action.payload) {
      const response: ApiResponse<any> = yield apiCall(
        apiGetCall,
        prepare(API_ENDPOINT_DETAILS_STUDENT, { UserID: action.payload }, {}),
      );

      if (response.data && response.data.Success) {
        yield put(fetchDetailsStudentSuccess(response.data.Data));
        yield put(passDetailsStudent(response.data.Data));
      } else {
        yield put(fetchDetailsStudentErr('Get Details Student Failed'));
      }
    } else {
      yield put(fetchDetailsStudentErr('Get Details Student Failed'));
    }
  } catch (error) {
    console.log(error);
    yield put(fetchDetailsStudentErr('Get Details Student Failed'));
  }
}

function* addOrUpdateStudentSaga(action: AddOrUpdateStudentAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(apiPostCall, API_ENDPOINT_CREATE_UPDATE_STUDENT, {
      ...action.payload,
    });

    if (response.data && response.data.Success && response.data.Data) {
      yield put(addOrUpdateStudentSuccess(response.data.Data));
      yield put(fetchDetailsStudent(response.data.Data.ID));
      openNotification('success', 'Success', 'Saved successfully');
    } else {
      yield put(addOrUpdateStudentErr(response.data.Message));
      openNotification('error', 'Save failed', response.data.Message);
    }
  } catch (error) {
    console.log(error);
    yield put(addOrUpdateStudentErr('Save Student Failed'));
    openNotification('error', '', 'Save Student Failed');
  }
}

function* deleteStudentSaga(action: DeleteStudentAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(
      apiPostCall,
      `${API_ENDPOINT_DELETE_STUDENT}?studentId=${action.payload}`,
      {},
    );

    if (response.data && response.data.Success) {
      yield put(fetchListStudentPaging(1, 10));
      yield put(deleteStudentSuccess());
      openNotification('success', 'Success', 'Deleted successfully');
    } else {
      yield put(deleteStudentErr('Delete Failed'));
    }
  } catch (error) {
    yield put(deleteStudentErr('Delete Failed'));
  }
}

function* fetchListExamTypeStudentPagingSaga(action: FetchListExamTypeStudentPagingAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(
      apiGetCall,
      prepare(
        API_GET_EXAMTYPE_STUDENT,
        {},
        {
          pageIndex: action.payload.page,
          pageSize: action.payload.pageSize,
          UserID: action.payload.UserID,
        },
      ),
    );

    if (response.data && response.data.Success) {
      yield put(fetchListExamTypeStudentPagingSuccess(response.data.Data));
    } else {
      yield put(fetchListExamTypeStudentPagingErr('Get List StudentExamType Failed'));
      openNotification('error', '', 'Get List StudentExamType Failed');
    }
  } catch (error) {
    console.log(error);
    yield put(fetchListExamTypeStudentPagingErr('Get List StudentExamType Failed'));
    openNotification('error', '', 'Get List StudentExamType Failed');
  }
}

function* addOrUpdateExamTypeStudentSaga(action: AddUpdateExamTypeStudentAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(apiPostCall, API_ENDPOINT_CREATE_UPDATE_EXAMTYPESTUDENT, {
      ...action.payload,
    });

    if (response.data && response.data.Success && response.data.Data) {
      yield put(fetchListExamTypeStudentPaging(1, 10, action.UserID));
      yield put(fetchDetailsStudent(action.UserID));
      yield put(addOrUpdateExamTypeStudentSuccess(action.payload));
      openNotification('success', 'Success', 'Saved successfully');
    } else {
      yield put(addOrUpdateExamTypeStudentErr(response.data.Message));
      openNotification('error', 'Save failed', response.data.Message);
    }
  } catch (error) {
    console.log(error);
    yield put(addOrUpdateExamTypeStudentErr('Save Failed'));
    openNotification('error', '', 'Save Failed');
  }
}

function* deleteExamTypeStudentSaga(action: DeleteExamTypeStudentAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(
      apiPostCall,
      `${API_ENDPOINT_DELETE_EXAMTYPESTUDENT}?examTypeID=${action.payload}`,
      {},
    );

    if (response.data && response.data.Success) {
      yield put(fetchListExamTypeStudentPaging(1, 10, action.UserID));
      yield put(fetchDetailsStudent(action.UserID));
      yield put(deleteExamTypeStudentSuccess());
      openNotification('success', 'Success', 'Deleted successfully');
    } else {
      yield put(deleteExamTypeStudentErr('Delete Failed'));
    }
  } catch (error) {
    yield put(deleteExamTypeStudentErr('Delete Failed'));
  }
}

function* updateStatusStudentSaga(action: UpdateStatusStudentAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(
      apiPostCall,
      `${API_ENDPOINT_UPDATE_STATUS_STUDENT}?studentId=${action.ID}&status=${action.newStatus}`,
      {},
    );

    if (response.data && response.data.Success) {
      yield put(fetchListStudentPaging(1, 10));
      yield put(updateStatusStudentSuccess());
      openNotification('success', 'Success', 'Update status successfully');
    } else {
      yield put(updateStatusStudentErr('Update status Failed'));
    }
  } catch (error) {
    yield put(updateStatusStudentErr('Update status Failed'));
  }
}

function* resetPasswordSaga(action: ResetPasswordAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(apiPostCall, `${API_ENDPOINT_RESET_PASSWORD}`, {
      ...action.payload,
    });

    if (response.data && response.data.Success) {
      yield put(resetPasswordSuccess());
      openNotification('success', 'Success', 'Reset password successfully!');
    } else {
      yield put(resetPasswordErr('Reset password Failed'));
    }
  } catch (error) {
    yield put(resetPasswordErr('Reset password Failed'));
  }
}

function* approveSaga(action: ApproveAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(apiPostCall, `${API_ENDPOINT_APPROVE}`, { ...action.payload });

    if (response.data && response.data.Success) {
      yield put(approveSuccess());
      //openNotification('success', 'Success', 'Approve successfully!')
    } else {
      yield put(approveErr('Approve Failed'));
    }
  } catch (error) {
    yield put(approveErr('Approve Failed'));
  }
}

function* createAccountSaga(action: CreateAccountAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(apiPostCall, `${API_ENDPOINT_MAIL_CREATE_ACCOUNT}`, { ...action.payload });

    if (response.data && response.data.Success) {
      yield put(createAccountSuccess());
      //openNotification('success', 'Success', 'Approve successfully!')
    } else {
      yield put(createAccountErr('Create Account Failed'));
    }
  } catch (error) {
    yield put(createAccountErr('Create Account Failed'));
  }
}

function* refuseSaga(action: RefuseAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(apiPostCall, `${API_ENDPOINT_REFUSE}`, { ...action.payload });

    if (response.data && response.data.Success) {
      yield put(refuseSuccess());
      //openNotification('success', 'Success', 'Refuse successfully!')
    } else {
      yield put(refuseErr('Refuse Failed'));
    }
  } catch (error) {
    yield put(refuseErr('Refuse Failed'));
  }
}
export function* watchStudentActions() {
  yield takeEvery(FETCH_LIST_STUDENT_PAGING, fetchListStudentPagingSaga);
  yield takeEvery(FETCH_DETAILS_STUDENT, fetchDetailsStudentSaga);
  yield takeEvery(ADD_UPDATE_STUDENT, addOrUpdateStudentSaga);
  yield takeEvery(DELETE_STUDENT, deleteStudentSaga);
  yield takeEvery(FETCH_LIST_EXAMTYPESTUDENT_PAGING, fetchListExamTypeStudentPagingSaga);
  yield takeEvery(ADD_UPDATE_EXAMTYPESTUDENT, addOrUpdateExamTypeStudentSaga);
  yield takeEvery(DELETE_EXAMTYPESTUDENT, deleteExamTypeStudentSaga);
  yield takeEvery(UPDATE_STATUS_STUDENT, updateStatusStudentSaga);
  yield takeEvery(RESET_PASSWORD, resetPasswordSaga);
  yield takeEvery(APPROVE, approveSaga);
  yield takeEvery(CREATEACCOUNT, createAccountSaga);
  yield takeEvery(REFUSE, refuseSaga);
}
