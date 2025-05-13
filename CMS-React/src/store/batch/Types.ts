export const FETCH_LIST_BATCH_ID = 'FETCH_LIST_BATCH_ID';
export const FETCH_LIST_BATCH_ID_SUCCESS = 'FETCH_LIST_BATCH_ID_SUCCESS';
export interface GetBatchIDAction {
  type: typeof FETCH_LIST_BATCH_ID;
  payload: {};
}

export interface BatchModel {
  Code: string;
  ID: number;
}
export interface BatchState {
  data?: BatchModel[];
  loading?: boolean;
  error?: string;
}

export interface fetchListBatchIDSuccessAction {
  type: typeof FETCH_LIST_BATCH_ID_SUCCESS;
  payload: BatchModel;
}
export type BatchActionTypes = GetBatchIDAction | fetchListBatchIDSuccessAction;
