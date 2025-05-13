import { NullableString } from 'types/Global';
import { $PropertyType } from 'utility-types';

export interface StudentModel {
  ID?: number;
  Content?: NullableString;
  RoleID?: number;
  ClassID?: number;
  Name?: NullableString;
  Status?: number;
  Email?: NullableString;
  Username?: NullableString;
  Birthday?: NullableString;
  Title?: NullableString;
  Company?: NullableString;
  Address?: NullableString;
  PhoneNumber?: NullableString;
  Password?: NullableString;
  Gender?: number;
  ActiveDate?: NullableString;
  ExpireDate?: NullableString;
  TuitionFee?: NullableString;
  ExamType?: NullableString;
  CreatedDate?: NullableString;
  ReasonRefuse?: NullableString;
}

export interface AddOrUpdateStudentModel {
  ID: number;
  Email: string;
  Name: string;
  Username: string;
  Birthday: string;
  Title: string;
  Company: string;
  PhoneNumber: string;
  Gender: number;
  Address: string;
  ClassID: number;
  Password: string;
  ActiveDate: string;
  ExpireDate: string;
  TuitionFee: string;
  Status: number;
  ReasonRefuse: string;
}

export interface ExamTypeStudentModel {
  ID?: number;
  UserID?: number;
  ExamTypeID?: number;
  ExamType?: NullableString;
  Content?: NullableString;
  ActiveDate?: NullableString;
  ExpireDate?: NullableString;
  Status?: number;
}

export interface ResetPasswordModel {
  Name: string;
  Email: string;
  Password: string;
}
export interface ApproveModel {
  Name: string;
  Username: string;
  Email: string;
  Password: string;
}
export interface RefuseModel {
  Name: string;
  ReasonRefuse: string;
  Email: string;
}

export interface DataStudentPaging {
  ListUserPaging?: StudentModel[];
  totalRow?: number;
  pageIndex?: number;
  pageSize?: number;
}

export interface DataExamTypeStudentPaging {
  ListExamTypeStudentPaging?: ExamTypeStudentModel[];
  totalRow?: number;
  pageIndex?: number;
  pageSize?: number;
}

export interface StudentState {
  data?: StudentModel[];
  dataPaging?: DataStudentPaging;
  dataExamTypeStudentPaging?: DataExamTypeStudentPaging;
  studentForEdit?: StudentModel | null;
  examTypeStudentForEdit?: ExamTypeStudentModel | null;
  loading?: boolean;
  loadingResetPassword?: boolean;
  loadingApprove?: boolean;
  loadingCreateAccount?: boolean;
  loadingRefuse?: boolean;
  error?: string;
}

export const FETCH_LIST_STUDENT_PAGING = 'FETCH_LIST_STUDENT_PAGING';
export const FETCH_LIST_STUDENT_PAGING_SUCCESS = 'FETCH_LIST_STUDENT_PAGING_SUCCESS';
export const FETCH_LIST_STUDENT_PAGING_ERR = 'FETCH_LIST_STUDENT_PAGING_ERR';

export const DELETE_STUDENT_SUCCESS = 'DELETE_STUDENT_SUCCESS';
export const DELETE_STUDENT = 'DELETE_STUDENT';
export const DELETE_STUDENT_ERR = 'DELETE_STUDENT_ERR';

export const FETCH_DETAILS_STUDENT = 'FETCH_DETAILS_STUDENT';
export const FETCH_DETAILS_STUDENT_SUCCESS = 'FETCH_DETAILS_STUDENT_SUCCESS';
export const FETCH_DETAILS_STUDENT_ERR = 'FETCH_DETAILS_STUDENT_ERR';

export const ADD_UPDATE_STUDENT = 'ADD_UPDATE_STUDENT';
export const ADD_UPDATE_STUDENT_SUCCESS = 'ADD_UPDATE_STUDENT_SUCCESS';
export const ADD_UPDATE_STUDENT_ERR = 'ADD_UPDATE_STUDENT_ERR';

export const PASS_DETAILS_STUDENT = 'PASS_DETAILS_STUDENT';

export const FETCH_LIST_EXAMTYPESTUDENT_PAGING = 'FETCH_LIST_EXAMTYPESTUDENT_PAGING';
export const FETCH_LIST_EXAMTYPESTUDENT_PAGING_SUCCESS = 'FETCH_LIST_EXAMTYPESTUDENT_PAGING_SUCCESS';
export const FETCH_LIST_EXAMTYPESTUDENT_PAGING_ERR = 'FETCH_LIST_EXAMTYPESTUDENT_PAGING_ERR';

export const ADD_UPDATE_EXAMTYPESTUDENT = 'ADD_UPDATE_EXAMTYPESTUDENT';
export const ADD_UPDATE_EXAMTYPESTUDENT_SUCCESS = 'ADD_UPDATE_EXAMTYPESTUDENT_SUCCESS';
export const ADD_UPDATE_EXAMTYPESTUDENT_ERR = 'ADD_UPDATE_EXAMTYPESTUDENT_ERR';

export const DELETE_EXAMTYPESTUDENT_SUCCESS = 'DELETE_EXAMTYPESTUDENT_SUCCESS';
export const DELETE_EXAMTYPESTUDENT = 'DELETE_EXAMTYPESTUDENT';
export const DELETE_EXAMTYPESTUDENT_ERR = 'DELETE_EXAMTYPESTUDENT_ERR';

export const UPDATE_STATUS_STUDENT = 'UPDATE_STATUS_STUDENT';
export const UPDATE_STATUS_STUDENT_SUCCESS = 'UPDATE_STATUS_STUDENT_SUCCESS';
export const UPDATE_STATUS_STUDENT_ERR = 'UPDATE_STATUS_STUDENT_ERR';

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERR = 'RESET_PASSWORD_ERR';

export const REFUSE = 'REFUSE';
export const REFUSE_SUCCESS = 'REFUSE_SUCCESS';
export const REFUSE_ERR = 'REFUSE_ERR';

export const APPROVE = 'APPROVE';
export const APPROVE_SUCCESS = 'APPROVE_SUCCESS';
export const APPROVE_ERR = 'APPROVE_ERR';

export const CREATEACCOUNT = 'CREATEACCOUNT';
export const CREATEACCOUNT_SUCCESS = 'CREATEACCOUNT_SUCCESS';
export const CREATEACCOUNT_ERR = 'CREATEACCOUNT_ERR';

export interface PassDetailsStudent {
  type: typeof PASS_DETAILS_STUDENT;
  payload: StudentModel | null;
}

export interface FetchListStudentPagingAction {
  type: typeof FETCH_LIST_STUDENT_PAGING;
  payload: {
    page: number;
    pageSize: number;
    startDate?: string;
    endDate?: string;
    emailSearch?: string;
    status?: number;
  };
}

export interface FetchListStudentPagingSuccessAction {
  type: typeof FETCH_LIST_STUDENT_PAGING_SUCCESS;
  payload: DataStudentPaging;
}

export interface FetchListStudentPagingErrorAction {
  type: typeof FETCH_LIST_STUDENT_PAGING_ERR;
  payload: string;
}

export interface FetchListExamTypeStudentPagingAction {
  type: typeof FETCH_LIST_EXAMTYPESTUDENT_PAGING;
  payload: {
    page: number;
    pageSize: number;
    UserID: number;
  };
}

export interface FetchListExamTypeStudentPagingSuccessAction {
  type: typeof FETCH_LIST_EXAMTYPESTUDENT_PAGING_SUCCESS;
  payload: DataExamTypeStudentPaging;
}

export interface FetchListExamTypeStudentPagingErrorAction {
  type: typeof FETCH_LIST_EXAMTYPESTUDENT_PAGING_ERR;
  payload: string;
}

export interface FetchDetailsStudentAction {
  type: typeof FETCH_DETAILS_STUDENT;
  payload: number;
}

export interface FetchDetailsStudentSuccessAction {
  type: typeof FETCH_DETAILS_STUDENT_SUCCESS;
  payload: StudentModel;
}

export interface FetchDetailsStudentErrorAction {
  type: typeof FETCH_DETAILS_STUDENT_ERR;
  payload: string;
}

export interface AddOrUpdateStudentAction {
  type: typeof ADD_UPDATE_STUDENT;
  payload: AddOrUpdateStudentModel;
}

export interface AddOrUpdateStudentSuccessAction {
  type: typeof ADD_UPDATE_STUDENT_SUCCESS;
  payload: AddOrUpdateStudentModel;
}

export interface AddOrUpdateStudentErrorAction {
  type: typeof ADD_UPDATE_STUDENT_ERR;
  payload: string;
}

export interface DeleteStudentAction {
  type: typeof DELETE_STUDENT;
  payload: number;
  page: number;
}

export interface DeleteStudentSuccessAction {
  type: typeof DELETE_STUDENT_SUCCESS;
}

export interface DeleteStudentErrorAction {
  type: typeof DELETE_STUDENT_ERR;
  payload: string;
}

export interface AddUpdateExamTypeStudentAction {
  type: typeof ADD_UPDATE_EXAMTYPESTUDENT;
  payload: ExamTypeStudentModel;
  page: number;
  UserID: number;
}

export interface AddUpdateExamTypeStudentSuccessAction {
  type: typeof ADD_UPDATE_EXAMTYPESTUDENT_SUCCESS;
  payload: ExamTypeStudentModel;
}

export interface AddUpdateExamTypeStudentErrorAction {
  type: typeof ADD_UPDATE_EXAMTYPESTUDENT_ERR;
  payload: string;
}

export interface DeleteExamTypeStudentAction {
  type: typeof DELETE_EXAMTYPESTUDENT;
  payload: number;
  page: number;
  UserID: number;
}

export interface DeleteExamTypeStudentSuccessAction {
  type: typeof DELETE_EXAMTYPESTUDENT_SUCCESS;
}

export interface DeleteExamTypeStudentErrorAction {
  type: typeof DELETE_EXAMTYPESTUDENT_ERR;
  payload: string;
}

export interface UpdateStatusStudentAction {
  type: typeof UPDATE_STATUS_STUDENT;
  ID: number;
  newStatus: number;
  page: number;
}

export interface UpdateStatusStudentSuccessAction {
  type: typeof UPDATE_STATUS_STUDENT_SUCCESS;
}

export interface UpdateStatusStudentErrorAction {
  type: typeof UPDATE_STATUS_STUDENT_ERR;
  payload: string;
}

export interface ResetPasswordAction {
  type: typeof RESET_PASSWORD;
  payload: ResetPasswordModel;
}

export interface ResetPasswordSuccessAction {
  type: typeof RESET_PASSWORD_SUCCESS;
}

export interface ResetPasswordErrorAction {
  type: typeof RESET_PASSWORD_ERR;
  payload: string;
}

export interface ApproveAction {
  type: typeof APPROVE;
  payload: ApproveModel;
}

export interface ApproveSuccessAction {
  type: typeof APPROVE_SUCCESS;
}

export interface ApproveErrorAction {
  type: typeof APPROVE_ERR;
  payload: string;
}

export interface CreateAccountAction {
  type: typeof CREATEACCOUNT;
  payload: ApproveModel;
}

export interface CreateAccountSuccessAction {
  type: typeof CREATEACCOUNT_SUCCESS;
}

export interface CreateAccountErrorAction {
  type: typeof CREATEACCOUNT_ERR;
  payload: string;
}

export interface RefuseAction {
  type: typeof REFUSE;
  payload: RefuseModel;
}

export interface RefuseSuccessAction {
  type: typeof REFUSE_SUCCESS;
}

export interface RefuseErrorAction {
  type: typeof REFUSE_ERR;
  payload: string;
}

export type StudentActionTypes =
  | FetchListStudentPagingAction
  | FetchListStudentPagingSuccessAction
  | FetchListStudentPagingErrorAction
  | FetchDetailsStudentAction
  | FetchDetailsStudentSuccessAction
  | FetchDetailsStudentErrorAction
  | AddOrUpdateStudentAction
  | AddOrUpdateStudentSuccessAction
  | AddOrUpdateStudentErrorAction
  | DeleteStudentAction
  | DeleteStudentSuccessAction
  | DeleteStudentErrorAction
  | PassDetailsStudent
  | FetchListExamTypeStudentPagingAction
  | AddUpdateExamTypeStudentAction
  | DeleteExamTypeStudentAction
  | FetchListExamTypeStudentPagingSuccessAction
  | AddUpdateExamTypeStudentSuccessAction
  | DeleteExamTypeStudentSuccessAction
  | FetchListExamTypeStudentPagingErrorAction
  | AddUpdateExamTypeStudentErrorAction
  | DeleteExamTypeStudentErrorAction
  | UpdateStatusStudentAction
  | UpdateStatusStudentSuccessAction
  | UpdateStatusStudentErrorAction
  | ResetPasswordAction
  | ResetPasswordSuccessAction
  | ResetPasswordErrorAction
  | ApproveAction
  | ApproveSuccessAction
  | ApproveErrorAction
  | CreateAccountAction
  | CreateAccountSuccessAction
  | CreateAccountErrorAction
  | RefuseAction
  | RefuseSuccessAction
  | RefuseErrorAction;
