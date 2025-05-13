import { ReactNode } from 'react';
import { NullableString } from 'types/Global';
import { $PropertyType } from 'utility-types';

export interface AnswerModel {
  ID?: NullableString | number;
  QuestionID?: NullableString | number;
  Key?: string;
  State?: NullableString | number | boolean;
  Explain?: string;
}
export interface QuestionModel {
  ID: number;
  Code?: string;
  TaskID?: number;
  Status?: number;
  Score?: number;
  Question?: string;
  BaCode?: string;
  ExamTypeCode?: NullableString | number;
  KACode?: NullableString | number;
  KAName?: string;
  TaskCode?: NullableString | number;
  TaskName?: string;
  ExamTypeID?: number;
  KAID?: number;
  TopicSetID?: number;
  answers: AnswerModel[];
  totalRow?: number;
  BatchID?: number | string;
  BatchCode?: string;
  Mode?: string;
  Action?: string;
  ObligatoryShow?: ReactNode;
}
export interface CompositeQuestionModel {
  ID?: number;
  ExamtypeCode: string;     
  CompositeQuestionID: number;
  ExamTypeID: number;
  ExamTypeCode: string;
  Question: string;
  CQStatus: number;
  CodeSearch: string;
  Obligatory?: boolean;
  TaskName: string;
  totalRow: number;
  Status: number;
  BatchID: number;
  BatchCode: string;
  questions: QuestionModel[] | [];
}



export interface QuestionApiModel {
  page?: number;
  content?: string;
  code?: string;
  id?: string | number;
  l1?: number;
  l2?: string;
  l3?: string;
  type?: string;
  status?: number;
}
export interface QuestionCreateModel {
  ID?: number;
  IsKaidTaskidValidExamtypeID?: boolean;
  ExamTypeID: number;
  Code: string;
  TaskID: number;
  Status: number;
  Score: number;
  Question: string;
  answers: AnswerModel[];
  notShowToastSuccess?: boolean;
  BatchID?: number | string;
  KAID?: number;
  BatchCode?: string;
}

export interface QuestionUpdateWrapModel {
  question: QuestionUpdateModel;
  answers: AnswerUpdateModel[];
}

export interface QuestionUpdateModel {
  CreatedDate: string | null;
  CreatedBy?: number;
  ModifiedDate: string | null;
  ModifiedBy?: number;
  ID: number;
  Code?: string;
  TaskID?: number;
  Status?: number;
  Score?: number;
  Question?: string;
}

export interface AnswerUpdateModel {
  CreatedDate: string | null;
  CreatedBy?: number;
  ModifiedDate: string | null;
  ModifiedBy?: number;
  ID: number;
  QuestionID?: number;
  Key?: string;
  State?: boolean;
  Explain?: string;
}

// export interface Question {
//   id: number;
//   name?: NullableString;
//   code?: NullableString;
//   exam_type?: NullableString;
// }

export interface CompositeQuestionModelWithRow {
  CompositeQuestionModel: CompositeQuestionModel[];
  totalRow: number;
}

export interface QuestionState {
  data?: QuestionModel[];
  dataComposite?: CompositeQuestionModel[];
  questionForEdit?: QuestionModel | null;
  questionForAdd?: QuestionModel | null;
  compositeQuestionForAdd?: CreateCompositeQuestionModel | null;
  compositeQuestionForEdit?: CreateCompositeQuestionModel | null;
  totalRow?: number;
  loading?: boolean;
  loadingSave?: boolean;
  error?: string;
}

export interface BatchModel {
  ID: number;
  Code: string;
  CreatedDate: string;
}
export interface CreateCompositeQuestionModel {
  ID?: number;
  ExamtypeID: number;
  ExamID?: number | null;
  Status: number;
  Score: number;
  Question: string;
  BatchID: number | string;
  BatchCode?: string;
  questions: QuestionCreateModel[] | [];
  Mode?: string;
  Action?: string;
  callbackFunc?: () => void;
}

export interface CompositeQuestionDetailModel {
  ID?: number;
  ExamTypeID: number;
  ExamID?: number | null;
  Status: number;
  Score: number;
  Question: string;
  BatchID: number | string;
  BatchCode: string;
  CreatedDate: string;
  questions: QuestionModel[] | null;
}

export const FETCH_LIST_QUESTION = 'FETCH_LIST_QUESTION';
export const FILTER_QUESTION = 'FILTER_QUESTION';
export const FETCH_LIST_QUESTION_SUCCESS = 'FETCH_LIST_QUESTION_SUCCESS';
export const FETCH_LIST_COMPOSITE_QUESTION_SUCCESS = 'FETCH_LIST_COMPOSITE_QUESTION_SUCCESS';
export const FETCH_LIST_QUESTION_ERR = 'FETCH_LIST_QUESTION_ERR';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_QUESTION_SUCCESS = 'ADD_QUESTION_SUCCESS';
export const ADD_QUESTION_ERR = 'ADD_QUESTION_ERR';

export const DELETE_QUESTION = 'DELETE_QUESTION';
export const DELETE_COMPOSITE_QUESTION = 'DELETE_COMPOSITE_QUESTION';
export const DELETE_QUESTION_SUCCESS = 'DELETE_QUESTION_SUCCESS';
export const DELETE_COMPOSITE_QUESTION_SUCCESS = 'DELETE_COMPOSITE_QUESTION_SUCCESS';
export const DELETE_QUESTION_ERR = 'DELETE_QUESTION_ERR';
export const FETCH_DETAILS_QUESTION = 'FETCH_DETAILS_QUESTION';
export const FETCH_DETAILS_QUESTION_SUCCESS = 'FETCH_DETAILS_QUESTION_SUCCESS';
export const FETCH_DETAILS_QUESTION_ERR = 'FETCH_DETAILS_QUESTION_ERR';

export const PASS_DETAILS_QUESTION = 'PASS_DETAILS_QUESTION';

export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const UPDATE_QUESTION_SUCCESS = 'UPDATE_QUESTION_SUCCESS';
export const UPDATE_QUESTION_ERR = 'UPDATE_QUESTION_ERR';

export const DOWNLOAD_TEMPLATE_FILL_QUESTION = 'DOWNLOAD_TEMPLATE_FILL_QUESTION';
export const DOWNLOAD_TEMPLATE_FILL_QUESTION_SUCCESS = 'DOWNLOAD_TEMPLATE_FILL_QUESTION_SUCCESS';
export const DOWNLOAD_TEMPLATE_FILL_QUESTION_ERR = 'DOWNLOAD_TEMPLATE_FILL_QUESTION_ERR';

export const CREATE_BATCH = 'CREATE_BATCH';
export const CREATE_BATCH_SUCCESS = 'CREATE_BATCH_SUCCESS';
export const CREATE_BATCH_ERR = 'CREATE_BATCH_ERR';

export const CREATE_COMPOSITE_QUESTION = 'CREATE_COMPOSITE_QUESTION';
export const CREATE_COMPOSITE_QUESTION_SUCCESS = 'CREATE_COMPOSITE_QUESTION_SUCCESS';
export const CREATE_COMPOSITE_QUESTION_ERR = 'CREATE_COMPOSITE_QUESTION_ERR';

export const SET_QUESTION_ADD = 'SET_QUESTION_ADD';
export const SET_COMPOSITE_QUESTION_ADD = 'SET_COMPOSITE_QUESTION_ADD';

export const FETCH_COMPOSITE_QUESTION_DETAIL = 'FETCH_COMPOSITE_QUESTION_DETAIL';
export const FETCH_COMPOSITE_QUESTION_DETAIL_SUCCESS = 'FETCH_COMPOSITE_QUESTION_DETAIL_SUCCESS';
export const FETCH_COMPOSITE_QUESTION_DETAIL_ERR = 'FETCH_COMPOSITE_QUESTION_DETAIL_ERR';
export const SET_COMPOSITE_QUESTION_DETAIL = 'SET_COMPOSITE_QUESTION_DETAIL';

export const UPDATE_COMPOSITE_QUESTION = 'UPDATE_COMPOSITE_QUESTION';
export const UPDATE_COMPOSITE_QUESTION_SUCCESS = 'UPDATE_COMPOSITE_QUESTION_SUCCESS';
export const UPDATE_COMPOSITE_QUESTION_ERR = 'UPDATE_COMPOSITE_QUESTION_ERR';

export interface FetchListQuestionAction {
  type: typeof FETCH_LIST_QUESTION;
  payload: {
    searchKey: string;
    page: number;
    pageSize: number;
  };
}
export interface FilterQuestionAction {
  type: typeof FILTER_QUESTION;
  payload: QuestionApiModel;
}
export interface FetchListQuestionSuccessAction {
  type: typeof FETCH_LIST_QUESTION_SUCCESS;
  payload: QuestionModel[];
}
export interface FetchListCompositeQuestionSuccessAction {
  type: typeof FETCH_LIST_COMPOSITE_QUESTION_SUCCESS;
  payload: CompositeQuestionModel[];
}
export interface FetchListQuestionErrorAction {
  type: typeof FETCH_LIST_QUESTION_ERR;
  payload: string;
}

export interface AddQuestionAction {
  type: typeof ADD_QUESTION;
  payload: QuestionCreateModel;
}

export interface AddQuestionSuccessAction {
  type: typeof ADD_QUESTION_SUCCESS;
}

export interface AddQuestionERRAction {
  type: typeof ADD_QUESTION_ERR;
  payload: string;
}

export interface DeleteQuestionAction {
  type: typeof DELETE_QUESTION;
  payload: {
    id: number,
    page: number,
  };
}
export interface DeleteCompositeQuestionAction {
  type: typeof DELETE_COMPOSITE_QUESTION;
  payload: {
    id: number,
    page: number,
  };
}
export interface DeleteQuestionSuccessAction {
  type: typeof DELETE_QUESTION_SUCCESS;
}

export interface DeleteCompositeQuestionSuccessAction {
  type: typeof DELETE_COMPOSITE_QUESTION_SUCCESS;
}
export interface DeleteQuestionERRAction {
  type: typeof DELETE_QUESTION_ERR;
  payload: string;
}

export interface FetchDetailsQuestionAction {
  type: typeof FETCH_DETAILS_QUESTION;
  payload: number;
}

export interface FetchDetailsQuestionSuccessAction {
  type: typeof FETCH_DETAILS_QUESTION_SUCCESS;
  payload: QuestionModel;
}

export interface FetchDetailsQuestionErrorAction {
  type: typeof FETCH_DETAILS_QUESTION_ERR;
  payload: string;
}

export interface PassDetailsQuestion {
  type: typeof PASS_DETAILS_QUESTION;
  payload: QuestionModel | null;
}

export interface UpdateQuestionAction {
  type: typeof UPDATE_QUESTION;
  payload: QuestionUpdateWrapModel;
}

export interface UpdateQuestionSuccessAction {
  type: typeof UPDATE_QUESTION_SUCCESS;
}

export interface UpdateQuestionErrorAction {
  type: typeof UPDATE_QUESTION_ERR;
  payload: string;
}

export interface DownloadTemplateFillQuestionAction {
  type: typeof DOWNLOAD_TEMPLATE_FILL_QUESTION;
}

export interface DownloadTemplateFillQuestionSuccessAction {
  type: typeof DOWNLOAD_TEMPLATE_FILL_QUESTION_SUCCESS;
}

export interface DownloadTemplateFillQuestionErrorAction {
  type: typeof DOWNLOAD_TEMPLATE_FILL_QUESTION_ERR;
  payload: string;
}

export interface CreateBatchAction {
  type: typeof CREATE_BATCH;
  payload: (batch: BatchModel) => void;
}

export interface CreateBatchSuccessAction {
  type: typeof CREATE_BATCH_SUCCESS;
}

export interface CreateBatchErrorAction {
  type: typeof CREATE_BATCH_ERR;
  payload: string;
}

export interface CreateCompositeQuestionAction {
  type: typeof CREATE_COMPOSITE_QUESTION;
  payload: CreateCompositeQuestionModel;
}

export interface CreateCompositeQuestionSuccessAction {
  type: typeof CREATE_COMPOSITE_QUESTION_SUCCESS;
}

export interface CreateCompositeQuestionErrorAction {
  type: typeof CREATE_COMPOSITE_QUESTION_ERR;
  payload: string;
}
export interface SetQuestionAddAction {
  type: typeof SET_QUESTION_ADD;
  payload: QuestionModel | null;
}
export interface UpdateCompositeQuestionSuccessAction {
  type: typeof UPDATE_COMPOSITE_QUESTION_SUCCESS;
}
export interface SetCompositeQuestionAddAction {
  type: typeof SET_COMPOSITE_QUESTION_ADD;
  payload: CreateCompositeQuestionModel | null;
}
export interface FetchCompositeQuestionAction {
  type: typeof FETCH_COMPOSITE_QUESTION_DETAIL;
  payload: number;
}
export interface FetchCompositeQuestionSuccessAction {
  type: typeof FETCH_COMPOSITE_QUESTION_DETAIL_SUCCESS;
  payload: CompositeQuestionDetailModel | null;
}
export interface FetchCompositeQuestionErrorAction {
  type: typeof FETCH_COMPOSITE_QUESTION_DETAIL_ERR;
  payload: string;
}
export interface UpdateCompositeQuestionAction {
  type: typeof UPDATE_COMPOSITE_QUESTION;
  payload: CreateCompositeQuestionModel;
}
export interface UpdateCompositeQuestionSuccessAction {
  type: typeof UPDATE_COMPOSITE_QUESTION_SUCCESS;
}
export interface UpdateCompositeQuestionErrorAction {
  type: typeof UPDATE_COMPOSITE_QUESTION_ERR;
  payload: string;
}
export interface SetCompositeQuestionAction {
  type: typeof SET_COMPOSITE_QUESTION_DETAIL;
}

export type QuestionActionTypes =
  | FetchListQuestionAction
  | FilterQuestionAction
  | FetchListQuestionSuccessAction
  | FetchListCompositeQuestionSuccessAction
  | FetchListQuestionErrorAction
  | FetchCompositeQuestionAction
  | FetchDetailsQuestionAction
  | FetchDetailsQuestionSuccessAction
  | FetchDetailsQuestionErrorAction
  | PassDetailsQuestion
  | AddQuestionAction
  | AddQuestionSuccessAction
  | AddQuestionERRAction
  | UpdateQuestionAction
  | UpdateCompositeQuestionAction
  | UpdateQuestionSuccessAction
  | UpdateQuestionErrorAction
  | DeleteQuestionAction
  | DeleteCompositeQuestionAction
  | DeleteQuestionSuccessAction
  | DeleteCompositeQuestionSuccessAction
  | DeleteQuestionERRAction
  | DownloadTemplateFillQuestionAction
  | DownloadTemplateFillQuestionSuccessAction
  | DownloadTemplateFillQuestionErrorAction
  | CreateBatchAction
  | CreateBatchSuccessAction
  | CreateBatchErrorAction
  | CreateCompositeQuestionAction
  | CreateCompositeQuestionSuccessAction
  | CreateCompositeQuestionErrorAction
  | SetQuestionAddAction
  | SetCompositeQuestionAddAction
  | FetchCompositeQuestionAction
  | FetchCompositeQuestionSuccessAction
  | FetchCompositeQuestionErrorAction
  | UpdateCompositeQuestionAction
  | UpdateCompositeQuestionSuccessAction
  | UpdateCompositeQuestionErrorAction
  | SetCompositeQuestionAddAction
  | SetCompositeQuestionAction;
