import { $PropertyType } from 'utility-types';
import {
  CREATE_TOPICSET,
  CREATE_TOPICSET_ERR,
  CREATE_TOPICSET_SUCCESS,
  DELETE_TOPICSET,
  DELETE_TOPICSET_ERR,
  DELETE_TOPICSET_SUCCESS,
  FETCH_DETAILS_TOPICSET,
  FETCH_DETAILS_TOPICSET_ERR,
  FETCH_DETAILS_TOPICSET_SUCCESS,
  FETCH_LIST_QUESTION_IN_TOPICSET_BY_EXAMTYPEID,
  FETCH_LIST_QUESTION_IN_TOPICSET_BY_EXAMTYPEID_ERR,
  FETCH_LIST_QUESTION_IN_TOPICSET_BY_EXAMTYPEID_SUCCESS,
  FETCH_LIST_TOPICSET_PAGING,
  FETCH_LIST_TOPICSET_PAGING_ERR,
  FETCH_LIST_TOPICSET_PAGING_SUCCESS,
  PASS_TOPICSET_DETAILS,
  QuestionsInTopicSetByExamtypeIDModel,
  TopicSetActionTypes,
  TopicSetCreateModel,
  TopicSetDetailGetModel,
  TopicSetGetModel,
  TopicSetStatusUpdateModel,
  TopicSetUpdateModel,
  UPDATE_STATUS_OF_TOPICSET,
  UPDATE_STATUS_OF_TOPICSET_ERR,
  UPDATE_STATUS_OF_TOPICSET_SUCCESS,
  UPDATE_TOPICSET,
  UPDATE_TOPICSET_ERR,
  UPDATE_TOPICSET_SUCCESS,
} from './Types';

export const fetchListTopicSetPaging = (
  page: number,
  pageSize: number,
  searchKey: string,
  examTypeID: number,
  typeOfTopicSetsID: number,
  codeSearch: string,
  name: string,
  status: string,
): TopicSetActionTypes => {
  return {
    type: FETCH_LIST_TOPICSET_PAGING,
    payload: { page, pageSize, searchKey, examTypeID, typeOfTopicSetsID, codeSearch, name, status },
  };
};

export const fetchListTopicSetPagingSuccess = (payload: TopicSetGetModel): TopicSetActionTypes => {
  return {
    type: FETCH_LIST_TOPICSET_PAGING_SUCCESS,
    payload,
  };
};

export const fetchListTopicSetPagingErr = (payload: string): TopicSetActionTypes => {
  return {
    type: FETCH_LIST_TOPICSET_PAGING_ERR,
    payload,
  };
};

export const fetchDetailsTopicSet = (topicSetID: number): TopicSetActionTypes => {
  return {
    type: FETCH_DETAILS_TOPICSET,
    payload: topicSetID,
  };
};

export const fetchDetailsTopicSetSuccess = (payload: TopicSetDetailGetModel): TopicSetActionTypes => {
  return {
    type: FETCH_DETAILS_TOPICSET_SUCCESS,
    payload,
  };
};

export const fetchDetailsTopicSetErr = (payload: string): TopicSetActionTypes => {
  return {
    type: FETCH_DETAILS_TOPICSET_ERR,
    payload,
  };
};

export const fetchListQuestionInTopicSetByExamTypeID = (examTypeID: number): TopicSetActionTypes => {
  return {
    type: FETCH_LIST_QUESTION_IN_TOPICSET_BY_EXAMTYPEID,
    payload: examTypeID,
  };
};

export const fetchListQuestionInTopicSetByExamTypeIDSuccess = (
  payload: QuestionsInTopicSetByExamtypeIDModel[],
): TopicSetActionTypes => {
  return {
    type: FETCH_LIST_QUESTION_IN_TOPICSET_BY_EXAMTYPEID_SUCCESS,
    payload,
  };
};

export const fetchListQuestionInTopicSetByExamTypeIDErr = (payload: string): TopicSetActionTypes => {
  return {
    type: FETCH_LIST_QUESTION_IN_TOPICSET_BY_EXAMTYPEID_ERR,
    payload,
  };
};

export const createTopicSet = (payload: TopicSetCreateModel): TopicSetActionTypes => {
  return {
    type: CREATE_TOPICSET,
    payload,
  };
};

export const createTopicSetSuccess = (): TopicSetActionTypes => {
  return {
    type: CREATE_TOPICSET_SUCCESS,
  };
};

export const createTopicSetErr = (payload: string): TopicSetActionTypes => {
  return {
    type: CREATE_TOPICSET_ERR,
    payload,
  };
};

export const updateTopicSet = (payload: TopicSetUpdateModel): TopicSetActionTypes => {
  return {
    type: UPDATE_TOPICSET,
    payload,
  };
};

export const updateTopicSetSuccess = (): TopicSetActionTypes => {
  return {
    type: UPDATE_TOPICSET_SUCCESS,
  };
};

export const updateTopicSetErr = (payload: string): TopicSetActionTypes => {
  return {
    type: UPDATE_TOPICSET_ERR,
    payload,
  };
};

export const updateStatusOfTopicSet = (payload: TopicSetStatusUpdateModel): TopicSetActionTypes => {
  return {
    type: UPDATE_STATUS_OF_TOPICSET,
    payload,
  };
};

export const updateStatusOfTopicSetSuccess = (): TopicSetActionTypes => {
  return {
    type: UPDATE_STATUS_OF_TOPICSET_SUCCESS,
  };
};

export const updateStatusOfTopicSetErr = (payload: string): TopicSetActionTypes => {
  return {
    type: UPDATE_STATUS_OF_TOPICSET_ERR,
    payload,
  };
};

export const deleteTopicSet = (topicSetID: number): TopicSetActionTypes => {
  return {
    type: DELETE_TOPICSET,
    payload: topicSetID,
  };
};

export const deleteTopicSetSuccess = (): TopicSetActionTypes => {
  return {
    type: DELETE_TOPICSET_SUCCESS,
  };
};

export const deleteTopicSetSetErr = (payload: string): TopicSetActionTypes => {
  return {
    type: DELETE_TOPICSET_ERR,
    payload,
  };
};

export const passTopicSetDetails = (payload: TopicSetDetailGetModel | null): TopicSetActionTypes => {
  return {
    type: PASS_TOPICSET_DETAILS,
    payload,
  };
};
