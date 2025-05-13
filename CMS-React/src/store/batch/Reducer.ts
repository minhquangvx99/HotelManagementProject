import { WithLogoutAction } from 'types/Global';
import { BatchActionTypes, BatchState, FETCH_LIST_BATCH_ID, FETCH_LIST_BATCH_ID_SUCCESS } from './Types';

const initialState: BatchState = {};

const batchReducer = (state = initialState, action: WithLogoutAction<BatchActionTypes>): BatchState => {
  switch (action.type) {
    case FETCH_LIST_BATCH_ID:
      return {
        ...state,
        loading: false,
      };
    case FETCH_LIST_BATCH_ID_SUCCESS:
      return {
        ...state,
        loading: true,
        data: Array.isArray(action.payload) ? action.payload : [action.payload],
      };
    default:
      return state;
  }
};

export default batchReducer;
