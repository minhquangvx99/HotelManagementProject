import { WithLogoutAction } from 'types/Global';
import { CREATE_TOPICSET, CREATE_TOPICSET_ERR, CREATE_TOPICSET_SUCCESS, DELETE_TOPICSET, DELETE_TOPICSET_ERR, DELETE_TOPICSET_SUCCESS, FETCH_DETAILS_TOPICSET, FETCH_DETAILS_TOPICSET_ERR, FETCH_DETAILS_TOPICSET_SUCCESS, FETCH_LIST_QUESTION_IN_TOPICSET_BY_EXAMTYPEID, FETCH_LIST_QUESTION_IN_TOPICSET_BY_EXAMTYPEID_ERR, FETCH_LIST_QUESTION_IN_TOPICSET_BY_EXAMTYPEID_SUCCESS, FETCH_LIST_TOPICSET_PAGING, FETCH_LIST_TOPICSET_PAGING_ERR, FETCH_LIST_TOPICSET_PAGING_SUCCESS, PASS_TOPICSET_DETAILS, TopicSetActionTypes, TopicSetState, UPDATE_STATUS_OF_TOPICSET, UPDATE_STATUS_OF_TOPICSET_ERR, UPDATE_STATUS_OF_TOPICSET_SUCCESS, UPDATE_TOPICSET, UPDATE_TOPICSET_ERR, UPDATE_TOPICSET_SUCCESS } from './Types';

const initialState: TopicSetState = {};

const topicSetReducer = (state = initialState, action: WithLogoutAction<TopicSetActionTypes>): TopicSetState => {
    switch (action.type) {
      case FETCH_LIST_TOPICSET_PAGING:
        return {
          ...state,
          loading: true,
        };
      case FETCH_LIST_TOPICSET_PAGING_SUCCESS:
        return {
          ...state,
          loading: false,
          dataPaging: action.payload,
        };
      case FETCH_LIST_TOPICSET_PAGING_ERR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

      case FETCH_DETAILS_TOPICSET:
        return {
          ...state,
          loading: true,
        };
      case FETCH_DETAILS_TOPICSET_SUCCESS:
        return {
          ...state,
          topicSetForEdit: action.payload,
          loading: false,
        };
      case FETCH_DETAILS_TOPICSET_ERR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

        case FETCH_LIST_QUESTION_IN_TOPICSET_BY_EXAMTYPEID:
          return {
            ...state,
            loading: true,
          };
        case FETCH_LIST_QUESTION_IN_TOPICSET_BY_EXAMTYPEID_SUCCESS:
          return {
            ...state,
            loading: false,
            dataQuestionInTopicSetByExamTypeID: action.payload,
          };
        case FETCH_LIST_QUESTION_IN_TOPICSET_BY_EXAMTYPEID_ERR:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };

      case CREATE_TOPICSET:
        return {
          ...state,
          loading: true,
        };
      case CREATE_TOPICSET_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case CREATE_TOPICSET_ERR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case UPDATE_TOPICSET:
        return {
            ...state,
            loading: true,
        };
      case UPDATE_TOPICSET_SUCCESS:
        return {
            ...state,
            loading: false,
        };
      case UPDATE_TOPICSET_ERR:
        return {
            ...state,
            loading: false,
            error: action.payload,
        };

        case UPDATE_STATUS_OF_TOPICSET:
          return {
              ...state,
              loading: true,
          };
        case UPDATE_STATUS_OF_TOPICSET_SUCCESS:
          return {
              ...state,
              loading: false,
          };
        case UPDATE_STATUS_OF_TOPICSET_ERR:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };

      case DELETE_TOPICSET:
        return {
            ...state,
            loading: true,
        };
      case DELETE_TOPICSET_SUCCESS:
        return {
            ...state,
            loading: false,
        };
      case DELETE_TOPICSET_ERR:
        return {
            ...state,
            loading: false,
            error: action.payload,
        };

      case PASS_TOPICSET_DETAILS:
        return {
            ...state,
            loading: false,
            topicSetForEdit: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default topicSetReducer;