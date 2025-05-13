/*
 * This file is part of OrangeHRM
 *
 * Copyright (C) 2020 onwards OrangeHRM (https://www.orangehrm.com/)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

import { WithLogoutAction } from 'types/Global';
import {
  QuestionState,
  QuestionActionTypes,
  FETCH_LIST_QUESTION,
  FETCH_LIST_QUESTION_ERR,
  FETCH_LIST_QUESTION_SUCCESS,
  FETCH_LIST_COMPOSITE_QUESTION_SUCCESS,
  DELETE_QUESTION,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_ERR,
  ADD_QUESTION,
  ADD_QUESTION_SUCCESS,
  ADD_QUESTION_ERR,
  PASS_DETAILS_QUESTION,
  UPDATE_QUESTION,
  UPDATE_QUESTION_ERR,
  UPDATE_QUESTION_SUCCESS,
  FETCH_DETAILS_QUESTION,
  FETCH_DETAILS_QUESTION_SUCCESS,
  FETCH_DETAILS_QUESTION_ERR,
  DOWNLOAD_TEMPLATE_FILL_QUESTION,
  DOWNLOAD_TEMPLATE_FILL_QUESTION_SUCCESS,
  DOWNLOAD_TEMPLATE_FILL_QUESTION_ERR,
  CREATE_BATCH,
  CREATE_BATCH_SUCCESS,
  CREATE_BATCH_ERR,
  CREATE_COMPOSITE_QUESTION,
  CREATE_COMPOSITE_QUESTION_SUCCESS,
  CREATE_COMPOSITE_QUESTION_ERR,
  SET_QUESTION_ADD,
  SET_COMPOSITE_QUESTION_ADD,
  FETCH_COMPOSITE_QUESTION_DETAIL,
  FETCH_COMPOSITE_QUESTION_DETAIL_SUCCESS,
  FETCH_COMPOSITE_QUESTION_DETAIL_ERR,
  QuestionModel,
  CreateCompositeQuestionModel,
  UPDATE_COMPOSITE_QUESTION,
  UPDATE_COMPOSITE_QUESTION_SUCCESS,
  UPDATE_COMPOSITE_QUESTION_ERR,
  SET_COMPOSITE_QUESTION_DETAIL,
  DELETE_COMPOSITE_QUESTION_SUCCESS,
  DELETE_COMPOSITE_QUESTION,
  FILTER_QUESTION,
} from './Types';
import moment from 'moment';

const initialState: QuestionState = {};

const questionReducer = (state = initialState, action: WithLogoutAction<QuestionActionTypes>): QuestionState => {
  switch (action.type) {
    case FETCH_LIST_QUESTION:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LIST_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FILTER_QUESTION:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LIST_COMPOSITE_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        dataComposite: action.payload,
      };
    case FETCH_LIST_QUESTION_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_QUESTION:
      return {
        ...state,
        loading: true,
      };
    case ADD_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ADD_QUESTION_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_QUESTION:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_QUESTION_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_QUESTION:
      return {
        ...state,
        loading: true,
      };
    case DELETE_COMPOSITE_QUESTION:
      return {
        ...state,
        loading: true,
      };
    case DELETE_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_COMPOSITE_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_QUESTION_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case PASS_DETAILS_QUESTION:
      return {
        ...state,
        loading: false,
        questionForEdit: action.payload,
      };
    case FETCH_DETAILS_QUESTION:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DETAILS_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        questionForEdit: action.payload,
      };
    case FETCH_DETAILS_QUESTION_ERR:
      return {
        ...state,
        loading: false,
      };
    case DOWNLOAD_TEMPLATE_FILL_QUESTION:
      return {
        ...state,
        loading: true,
      };
    case DOWNLOAD_TEMPLATE_FILL_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DOWNLOAD_TEMPLATE_FILL_QUESTION_ERR:
      return {
        ...state,
        loading: false,
      };

    case CREATE_BATCH:
      return {
        ...state,
      };
    case CREATE_BATCH_SUCCESS:
      return {
        ...state,
      };
    case CREATE_BATCH_ERR:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_COMPOSITE_QUESTION:
    case CREATE_COMPOSITE_QUESTION:
      return {
        ...state,
        loadingSave: true,
      };
    case UPDATE_COMPOSITE_QUESTION_SUCCESS:
    case CREATE_COMPOSITE_QUESTION_SUCCESS:
      return {
        ...state,
        loadingSave: false,
      };
    case UPDATE_COMPOSITE_QUESTION_ERR:
    case CREATE_COMPOSITE_QUESTION_ERR:
      return {
        ...state,
        loadingSave: false,
        error: action.payload,
      };

    case SET_QUESTION_ADD:
      return {
        ...state,
        questionForAdd: action.payload,
      };

    case SET_COMPOSITE_QUESTION_ADD:
      return {
        ...state,
        compositeQuestionForAdd: action.payload,
      };

    case FETCH_COMPOSITE_QUESTION_DETAIL:
      return {
        ...state,
        loadingSave: true,
      };
    case FETCH_COMPOSITE_QUESTION_DETAIL_SUCCESS:
      const questions: any[] = [];
      action.payload?.questions?.map((q: any) => {
        const singleQuestion = {
          ID: q.ID,
          Code: q.Code,
          TaskID: q.TaskID,
          KAID: q.KAID,
          Status: q.Status,
          Score: q.Score,
          Question: q.Question,
          ExamTypeCode: q.ExamTypeName,
          ExamTypeID: q.ExamTypeID,
          answers: q.answers,
          BatchID: action.payload?.BatchCode,
          Mode: 'composite',
        } as QuestionModel;
        questions.push(singleQuestion);
      });
      const compositeQuestionFormat = {
        ID: action.payload?.ID,
        ExamtypeID: action.payload?.ExamTypeID,
        ExamID: action.payload?.ExamID,
        Status: action.payload?.Status,
        Score: action.payload?.Score,
        Question: action.payload?.Question,
        BatchID: action.payload?.BatchID,
        BatchCode: action.payload?.BatchCode,
        questions: questions,
      } as CreateCompositeQuestionModel;
      return {
        ...state,
        loadingSave: false,
        compositeQuestionForEdit: compositeQuestionFormat,
      };
    case FETCH_COMPOSITE_QUESTION_DETAIL_ERR:
      return {
        ...state,
        loadingSave: false,
      };
    case SET_COMPOSITE_QUESTION_DETAIL:
      return {
        ...state,
        compositeQuestionForEdit: null,
      };
    default:
      return state;
  }
};

export default questionReducer;
