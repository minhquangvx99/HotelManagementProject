import { CompositeQuestionModel } from 'store/question/Types';
import { NullableString } from 'types/Global';
import { $PropertyType } from 'utility-types';

export interface TopicSetState {
  dataPaging?: TopicSetGetModel;
  dataQuestionInTopicSetByExamTypeID?: QuestionsInTopicSetByExamtypeIDModel[];
  dataAll?: TopicSetGetModel;
  topicSetForEdit?: TopicSetDetailGetModel | null;
  loading?: boolean;
  error?: string;
}

export interface TopicSetModel {
  TopicSetID?: number;
  ExamType?: string;
  ExamCode?: number;
  TypeOfTopicSet?: string;
  NumberOfQuestion?: number;
  Code?: string;
  Admin?: string;
  Status?: number;
  Name?: string;
}

export interface TopicSetGetModel {
  ListTopicSet: TopicSetModel[];
  totalRow?: number;
}

export interface TopicSetDetailGetModel {
  TopicSetID?: number;
  TopicSetCode?: string;
  Name?: string;
  Status?: number;
  ExamTypeID?: number;
  TypeOfTopicSetID?: number;
  NumberOfQuestion?: number;
  QuestionsInTopicSet?: QuestionInTopicSetModel[];
  QuestionsCompositeInTopicSet?: CompositeQuestionModel[];
}

export interface QuestionInTopicSetModel {
  QuestionID?: number;
  Task?: string;
  TaskID?: number;
  QuestionContent?: string;
  Obligatory?: boolean;
  ExamTypeID?: number;
  // ID?:number;
  // Question: string;
  // IsSingle? : boolean;
  // TaskCode?: string;
  KACode?: string;
}

export interface QuestionsInTopicSetByExamtypeIDModel {
  ID?: number;
  QuestionID?: number;
  Question: string;
  ExamTypeID?: number;
  TaskID?: number;
  Task?: string;
  Demo?: string;
  Obligatory?: boolean;
  Obligation?: boolean;
  IsSingle?: boolean;
  TaskCode?: string;
  KACode?: string;
}

export interface TopicSetCreateModel {
  TopicSetCode?: string;
  Name?: string;
  UserID?: number;
  Status?: number;
  ExamTypeID?: number;
  TypeOfTopicSetID?: number;
  QuestionAndObligatoryIds?: any[][];
  QuestionCompositeAndObligatoryIds?: any[][];
}

export interface TopicSetUpdateModel {
  TopicSetID?: number;
  UserID?: number;
  Status?: number;
  TypeOfTopicSetID?: number;
  QuestionAndObligatoryIds?: any[][];
}

export interface TopicSetStatusUpdateModel {
  examTypeID?: string;
  topicSetID?: number;
  topicSetStatus?: number;
  page?: number;
}

export const FETCH_LIST_TOPICSET_PAGING = 'FETCH_LIST_TOPICSET_PAGING';
export const FETCH_LIST_TOPICSET_PAGING_SUCCESS = 'FETCH_LIST_TOPICSET_PAGING_SUCCESS';
export const FETCH_LIST_TOPICSET_PAGING_ERR = 'FETCH_LIST_TOPICSET_PAGING_PAGING_ERR';

export const FETCH_DETAILS_TOPICSET = 'FETCH_DETAILS_TOPICSET';
export const FETCH_DETAILS_TOPICSET_SUCCESS = 'FETCH_DETAILS_TOPICSET_SUCCESS';
export const FETCH_DETAILS_TOPICSET_ERR = 'FETCH_DETAILS_TOPICSET_ERR';

export const FETCH_LIST_QUESTION_IN_TOPICSET_BY_EXAMTYPEID = 'FETCH_LIST_TOPICSET_BY_EXAMTYPEID';
export const FETCH_LIST_QUESTION_IN_TOPICSET_BY_EXAMTYPEID_SUCCESS = 'FETCH_LIST_TOPICSET_BY_EXAMTYPEID_SUCCESS';
export const FETCH_LIST_QUESTION_IN_TOPICSET_BY_EXAMTYPEID_ERR = 'FETCH_LIST_TOPICSET_BY_EXAMTYPEID_ERR';

export const CREATE_TOPICSET = 'CREATE_TOPICSET';
export const CREATE_TOPICSET_SUCCESS = 'CREATE_TOPICSET_SUCCESS';
export const CREATE_TOPICSET_ERR = 'CREATE_TOPICSET_ERR';

export const UPDATE_TOPICSET = 'UPDATE_TOPICSET';
export const UPDATE_TOPICSET_SUCCESS = 'UPDATE_TOPICSET_SUCCESS';
export const UPDATE_TOPICSET_ERR = 'UPDATE_TOPICSET_ERR';

export const UPDATE_STATUS_OF_TOPICSET = 'UPDATE_STATUS_OF_TOPICSET';
export const UPDATE_STATUS_OF_TOPICSET_SUCCESS = 'UPDATE_STATUS_OF_TOPICSET_SUCCESS';
export const UPDATE_STATUS_OF_TOPICSET_ERR = 'UPDATE_STATUS_OF_TOPICSET_ERR';

export const DELETE_TOPICSET = 'DELETE_TOPICSET';
export const DELETE_TOPICSET_SUCCESS = 'DELETE_TOPICSET_SUCCESS';
export const DELETE_TOPICSET_ERR = 'DELETE_TOPICSET_ERR';

export const PASS_TOPICSET_DETAILS = 'PASS_TOPICSET_DETAILS';

export interface FetchListTopicSetPagingAction {
  type: typeof FETCH_LIST_TOPICSET_PAGING;
  payload: {
    page: number;
    pageSize: number;
    searchKey: string;
    examTypeID: number;
    typeOfTopicSetsID: number;
    codeSearch: string;
    name: string;
    status: string;
  };
}

export interface FetchListTopicSetPagingSuccessAction {
  type: typeof FETCH_LIST_TOPICSET_PAGING_SUCCESS;
  payload: TopicSetGetModel;
}

export interface FetchListTopicSetPagingErrorAction {
  type: typeof FETCH_LIST_TOPICSET_PAGING_ERR;
  payload: string;
}

export interface FetchDetailsTopicSetAction {
  type: typeof FETCH_DETAILS_TOPICSET;
  payload: number;
}

export interface FetchDetailsTopicSetSuccessAction {
  type: typeof FETCH_DETAILS_TOPICSET_SUCCESS;
  payload: TopicSetDetailGetModel;
}

export interface FetchDetailsTopicSetErrorAction {
  type: typeof FETCH_DETAILS_TOPICSET_ERR;
  payload: string;
}

export interface FetchListQuestionInTopicSetByExamTypeIDAction {
  type: typeof FETCH_LIST_QUESTION_IN_TOPICSET_BY_EXAMTYPEID;
  payload: number;
}

export interface FetchListQuestionInTopicSetByExamTypeIDSuccessAction {
  type: typeof FETCH_LIST_QUESTION_IN_TOPICSET_BY_EXAMTYPEID_SUCCESS;
  payload: QuestionsInTopicSetByExamtypeIDModel[];
}

export interface FetchListQuestionInTopicSetByExamTypeIDErrorAction {
  type: typeof FETCH_LIST_QUESTION_IN_TOPICSET_BY_EXAMTYPEID_ERR;
  payload: string;
}

export interface CreateTopicSetAction {
  type: typeof CREATE_TOPICSET;
  payload: TopicSetCreateModel;
}

export interface CreateTopicSetSuccessAction {
  type: typeof CREATE_TOPICSET_SUCCESS;
}

export interface CreateTopicSetErrorAction {
  type: typeof CREATE_TOPICSET_ERR;
  payload: string;
}

export interface UpdateTopicSetAction {
  type: typeof UPDATE_TOPICSET;
  payload: TopicSetUpdateModel;
}

export interface UpdateTopicSetSuccessAction {
  type: typeof UPDATE_TOPICSET_SUCCESS;
}

export interface UpdateTopicSetErrorAction {
  type: typeof UPDATE_TOPICSET_ERR;
  payload: string;
}

export interface UpdateStatusOfTopicSetAction {
  type: typeof UPDATE_STATUS_OF_TOPICSET;
  payload: TopicSetStatusUpdateModel;
}

export interface UpdateStatusOfTopicSetSuccessAction {
  type: typeof UPDATE_STATUS_OF_TOPICSET_SUCCESS;
}

export interface UpdateStatusOfTopicSetErrorAction {
  type: typeof UPDATE_STATUS_OF_TOPICSET_ERR;
  payload: string;
}

export interface DeleteTopicSetAction {
  type: typeof DELETE_TOPICSET;
  payload: number;
}

export interface DeleteTopicSetSuccessAction {
  type: typeof DELETE_TOPICSET_SUCCESS;
}

export interface DeleteTopicSetErrorAction {
  type: typeof DELETE_TOPICSET_ERR;
  payload: string;
}

export interface PassTopicSetDetailsAction {
  type: typeof PASS_TOPICSET_DETAILS;
  payload: TopicSetDetailGetModel | null;
}

export type TopicSetActionTypes =
  | FetchListTopicSetPagingAction
  | FetchListTopicSetPagingSuccessAction
  | FetchListTopicSetPagingErrorAction
  | FetchDetailsTopicSetAction
  | FetchDetailsTopicSetSuccessAction
  | FetchDetailsTopicSetErrorAction
  | CreateTopicSetAction
  | CreateTopicSetSuccessAction
  | CreateTopicSetErrorAction
  | UpdateTopicSetAction
  | UpdateTopicSetSuccessAction
  | UpdateTopicSetErrorAction
  | DeleteTopicSetAction
  | DeleteTopicSetSuccessAction
  | DeleteTopicSetErrorAction
  | UpdateStatusOfTopicSetAction
  | UpdateStatusOfTopicSetSuccessAction
  | UpdateStatusOfTopicSetErrorAction
  | FetchListQuestionInTopicSetByExamTypeIDAction
  | FetchListQuestionInTopicSetByExamTypeIDSuccessAction
  | FetchListQuestionInTopicSetByExamTypeIDErrorAction
  | PassTopicSetDetailsAction;
