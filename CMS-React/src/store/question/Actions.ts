import { $PropertyType } from 'utility-types';
import {
  QuestionActionTypes,
  FETCH_LIST_QUESTION,
  QuestionModel,
  FETCH_LIST_QUESTION_SUCCESS,
  FETCH_LIST_QUESTION_ERR,
  FETCH_DETAILS_QUESTION,
  FETCH_DETAILS_QUESTION_SUCCESS,
  FETCH_DETAILS_QUESTION_ERR,
  DELETE_QUESTION,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_ERR,
  QuestionCreateModel,
  ADD_QUESTION,
  ADD_QUESTION_SUCCESS,
  ADD_QUESTION_ERR,
  PASS_DETAILS_QUESTION,
  UPDATE_QUESTION,
  UPDATE_QUESTION_SUCCESS,
  UPDATE_QUESTION_ERR,
  QuestionUpdateWrapModel,
  DOWNLOAD_TEMPLATE_FILL_QUESTION,
  DOWNLOAD_TEMPLATE_FILL_QUESTION_SUCCESS,
  DOWNLOAD_TEMPLATE_FILL_QUESTION_ERR,
  CREATE_BATCH,
  CREATE_BATCH_SUCCESS,
  CREATE_BATCH_ERR,
  BatchModel,
  CREATE_COMPOSITE_QUESTION,
  CREATE_COMPOSITE_QUESTION_SUCCESS,
  CREATE_COMPOSITE_QUESTION_ERR,
  CreateCompositeQuestionModel,
  SET_QUESTION_ADD,
  SET_COMPOSITE_QUESTION_ADD,
  FILTER_QUESTION,
  QuestionApiModel,
  FETCH_COMPOSITE_QUESTION_DETAIL,
  FETCH_COMPOSITE_QUESTION_DETAIL_SUCCESS,
  FETCH_LIST_COMPOSITE_QUESTION_SUCCESS,
  CompositeQuestionModel,
  FetchListCompositeQuestionSuccessAction, 
  FETCH_COMPOSITE_QUESTION_DETAIL_ERR,
  UPDATE_COMPOSITE_QUESTION,
  UPDATE_COMPOSITE_QUESTION_SUCCESS,
  UPDATE_COMPOSITE_QUESTION_ERR,
  SET_COMPOSITE_QUESTION_DETAIL,
  CompositeQuestionDetailModel,
  DELETE_COMPOSITE_QUESTION_SUCCESS,
  DELETE_COMPOSITE_QUESTION,
} from './Types';

export const fetchListQuestion = (searchKey: string, page: number, pageSize: number): QuestionActionTypes => {
  return {
    type: FETCH_LIST_QUESTION,
    payload: { searchKey, page, pageSize },
  };
};

export const filterQuestion = (payload: QuestionApiModel): QuestionActionTypes => {
  return {
    type: FILTER_QUESTION,
    payload,
  };
};

export const fetchListQuestionSuccess = (payload: QuestionModel[]): QuestionActionTypes => {
  return {
    type: FETCH_LIST_QUESTION_SUCCESS,
    payload,
  };
};

export const fetchListCompositeQuestionSuccess = (payload: CompositeQuestionModel[]): QuestionActionTypes => {
  return {
    type: FETCH_LIST_COMPOSITE_QUESTION_SUCCESS,
    payload,
  };
};

export const fetchListQuestionErr = (payload: string): QuestionActionTypes => {
  return {
    type: FETCH_LIST_QUESTION_ERR,
    payload,
  };
};

export const addQuestion = (payload: QuestionCreateModel): QuestionActionTypes => {
  return {
    type: ADD_QUESTION,
    payload,
  };
};

export const addQuestionSuccess = (): QuestionActionTypes => {
  return {
    type: ADD_QUESTION_SUCCESS,
  };
};

export const addQuestionError = (error: string): QuestionActionTypes => {
  return {
    type: ADD_QUESTION_ERR,
    payload: error,
  };
};

export const updateQuestion = (question: QuestionUpdateWrapModel): QuestionActionTypes => {
  return {
    type: UPDATE_QUESTION,
    payload: question,
  };
};

export const updateQuestionSuccess = (): QuestionActionTypes => {
  return {
    type: UPDATE_QUESTION_SUCCESS,
  };
};

export const updateQuestionError = (error: string): QuestionActionTypes => {
  return {
    type: UPDATE_QUESTION_ERR,
    payload: error,
  };
};

export const deleteQuestion = (payload: any): QuestionActionTypes => {
  return {
    type: DELETE_QUESTION,
    payload: payload,
  };
};
export const deleteCompositeQuestion = (payload: any): QuestionActionTypes => {
  return {
    type: DELETE_COMPOSITE_QUESTION,
    payload: payload,
  };
};
export const deleteQuestionSuccess = (): QuestionActionTypes => {
  return {
    type: DELETE_QUESTION_SUCCESS,
  };
};
export const deleteCompositeQuestionSuccess = (): QuestionActionTypes => {
  return {
    type: DELETE_COMPOSITE_QUESTION_SUCCESS,
  };
};
export const deleteQuestionERR = (error: string): QuestionActionTypes => {
  return {
    type: DELETE_QUESTION_ERR,
    payload: error,
  };
};

export const fetchDetailsQuestionAction = (payload: number): QuestionActionTypes => {
  return {
    type: FETCH_DETAILS_QUESTION,
    payload,
  };
};

export const passDetailsQuestion = (question: QuestionModel | null): QuestionActionTypes => {
  return {
    type: PASS_DETAILS_QUESTION,
    payload: question,
  };
};

export const fetchDetailsQuestionSuccess = (payload: QuestionModel): QuestionActionTypes => {
  return {
    type: FETCH_DETAILS_QUESTION_SUCCESS,
    payload,
  };
};

export const fetchDetailsQuestionErr = (payload: string): QuestionActionTypes => {
  return {
    type: FETCH_DETAILS_QUESTION_ERR,
    payload,
  };
};

export const downloadTemplateFillQuestion = (): QuestionActionTypes => {
  return {
    type: DOWNLOAD_TEMPLATE_FILL_QUESTION,
  };
};

export const downloadTemplateFillQuestionSuccess = (): QuestionActionTypes => {
  return {
    type: DOWNLOAD_TEMPLATE_FILL_QUESTION_SUCCESS,
  };
};

export const downloadTemplateFillQuestionErr = (payload: string): QuestionActionTypes => {
  return {
    type: DOWNLOAD_TEMPLATE_FILL_QUESTION_ERR,
    payload,
  };
};

export const createBatch = (callback: (batch: BatchModel) => void): QuestionActionTypes => {
  return {
    type: CREATE_BATCH,
    payload: callback,
  };
};

export const createBatchSuccess = (): QuestionActionTypes => {
  return {
    type: CREATE_BATCH_SUCCESS,
  };
};

export const createBatchnError = (error: string): QuestionActionTypes => {
  return {
    type: CREATE_BATCH_ERR,
    payload: error,
  };
};

export const createCompositeQuestion = (payload: CreateCompositeQuestionModel): QuestionActionTypes => {
  return {
    type: CREATE_COMPOSITE_QUESTION,
    payload,
  };
};

export const createCompositeQuestionSuccess = (): QuestionActionTypes => {
  return {
    type: CREATE_COMPOSITE_QUESTION_SUCCESS,
  };
};

export const createCompositeQuestionError = (error: string): QuestionActionTypes => {
  return {
    type: CREATE_COMPOSITE_QUESTION_ERR,
    payload: error,
  };
};

export const SetQuestionAdd = (payload: QuestionModel | null): QuestionActionTypes => {
  return {
    type: SET_QUESTION_ADD,
    payload,
  };
};

export const SetCompositeQuestionAdd = (payload: CreateCompositeQuestionModel | null): QuestionActionTypes => {
  return {
    type: SET_COMPOSITE_QUESTION_ADD,
    payload,
  };
};

export const fetchCompositeQuestion = (payload: number): QuestionActionTypes => {
  return {
    type: FETCH_COMPOSITE_QUESTION_DETAIL,
    payload,
  };
};

export const fetchCompositeQuestionSuccess = (payload: CompositeQuestionDetailModel): QuestionActionTypes => {
  return {
    type: FETCH_COMPOSITE_QUESTION_DETAIL_SUCCESS,
    payload,
  };
};

export const fetchCompositeQuestionError = (error: string): QuestionActionTypes => {
  return {
    type: FETCH_COMPOSITE_QUESTION_DETAIL_ERR,
    payload: error,
  };
};

export const updateCompositeQuestion = (payload: CreateCompositeQuestionModel): QuestionActionTypes => {
  return {
    type: UPDATE_COMPOSITE_QUESTION,
    payload,
  };
};

export const updateCompositeQuestionSuccess = (): QuestionActionTypes => {
  return {
    type: UPDATE_COMPOSITE_QUESTION_SUCCESS,
  };
};

export const updateCompositeQuestionError = (error: string): QuestionActionTypes => {
  return {
    type: UPDATE_COMPOSITE_QUESTION_ERR,
    payload: error,
  };
};

export const SetCompositeQuestionDetail = (): QuestionActionTypes => {
  return {
    type: SET_COMPOSITE_QUESTION_DETAIL,
  };
};
