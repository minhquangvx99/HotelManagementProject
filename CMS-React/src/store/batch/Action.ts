import { BatchActionTypes, BatchModel, FETCH_LIST_BATCH_ID, FETCH_LIST_BATCH_ID_SUCCESS } from './Types';

export const fetchListBatchID = (): BatchActionTypes => {
  return {
    type: FETCH_LIST_BATCH_ID,
    payload: {},
  };
};
// export const fetchListBatchIDSuccess = (data: any): BatchActionTypes => {
//   console.log(data);
//   return {
//     type: FETCH_LIST_BATCH_ID_SUCCESS,
//     payload: {},
//   };
// };
export const fetchListBatchIDSuccess = (payload: BatchModel, callback: void): BatchActionTypes => {
  return {
    type: FETCH_LIST_BATCH_ID_SUCCESS,
    payload,
  };
};
