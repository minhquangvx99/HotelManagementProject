import { NullableString } from 'types/Global';
import { $PropertyType } from 'utility-types';

export interface HotelModel {
  ID?: number;
  Name?: NullableString;
  Address?: NullableString;
  PhoneNumber?: NullableString;
  StarsNumber?: number;
  ManagerName?: NullableString;
  CreatedDate?: NullableString;
}
export interface DataHotelPaging {
  listHotel?: HotelModel[];
  totalRow?: number;
  pageIndex?: number;
  pageSize?: number;
}

export interface HotelState {
  data?: HotelModel[];
  dataPaging?: DataHotelPaging;
  hotelForEdit?: HotelModel;
  loading?: boolean;
  error?: string;
}

export const FETCH_LIST_HOTEL_PAGING = 'FETCH_LIST_HOTEL_PAGING';
export const FETCH_LIST_HOTEL_PAGING_SUCCESS = 'FETCH_LIST_HOTEL_PAGING_SUCCESS';
export const FETCH_LIST_HOTEL_PAGING_ERR = 'FETCH_LIST_HOTEL_PAGING_ERR';
export const FETCH_LIST_HOTEL_ALL = 'FETCH_LIST_HOTEL_ALL';
export const FETCH_LIST_HOTEL_ALL_SUCCESS = 'FETCH_LIST_HOTEL_ALL_SUCCESS';
export const FETCH_LIST_HOTEL_ALL_ERR = 'FETCH_LIST_HOTEL_ALL_ERR';
export const FETCH_DETAILS_HOTEL = 'FETCH_DETAILS_HOTEL';
export const FETCH_DETAILS_HOTEL_SUCCESS = 'FETCH_DETAILS_HOTEL_SUCCESS';
export const FETCH_DETAILS_HOTEL_ERR = 'FETCH_DETAILS_HOTEL_ERR';
export const SAVE_HOTEL = 'SAVE_HOTEL';
export const SAVE_HOTEL_SUCCESS = 'SAVE_HOTEL_SUCCESS';
export const SAVE_HOTEL_ERR = 'SAVE_HOTEL_ERR';
export const DELETE_HOTEL_SUCCESS = 'DELETE_HOTEL_SUCCESS';
export const DELETE_HOTEL = 'DELETE_HOTEL';
export const DELETE_HOTEL_ERR = 'DELETE_HOTEL_ERR';
export const UPDATE_HOTEL_FOR_EDIT = 'UPDATE_HOTEL_FOR_EDIT';

export interface FetchListHotelPagingAction {
  type: typeof FETCH_LIST_HOTEL_PAGING;
  payload: {
    page: number;
    pageSize: number;
    searchKey: string;
  };
}

export interface FetchListHotelPagingSuccessAction {
  type: typeof FETCH_LIST_HOTEL_PAGING_SUCCESS;
  payload: DataHotelPaging;
}

export interface FetchListHotelPagingErrorAction {
  type: typeof FETCH_LIST_HOTEL_PAGING_ERR;
  payload: string;
}

export interface FetchListHotelAllAction {
  type: typeof FETCH_LIST_HOTEL_ALL;
}

export interface FetchListHotelAllSuccessAction {
  type: typeof FETCH_LIST_HOTEL_ALL_SUCCESS;
  payload: HotelModel[];
}

export interface FetchListHotelAllErrorAction {
  type: typeof FETCH_LIST_HOTEL_ALL_ERR;
  payload: string;
}

export interface FetchDetailsHotelAction {
  type: typeof FETCH_DETAILS_HOTEL;
  payload: $PropertyType<HotelModel, 'ID'>;
}

export interface FetchDetailsHotelSuccessAction {
  type: typeof FETCH_DETAILS_HOTEL_SUCCESS;
  payload: HotelModel;
}

export interface FetchDetailsHotelErrorAction {
  type: typeof FETCH_DETAILS_HOTEL_ERR;
  payload: string;
}

export interface SaveHotelAction {
  type: typeof SAVE_HOTEL;
  payload: HotelModel;
  page: number;
}

export interface SaveHotelSuccessAction {
  type: typeof SAVE_HOTEL_SUCCESS;
}

export interface SaveHotelErrorAction {
  type: typeof SAVE_HOTEL_ERR;
  payload: string;
}

export interface DeleteHotelAction {
  type: typeof DELETE_HOTEL;
  payload: number;
  page: number;
}

export interface DeleteHotelSuccessAction {
  type: typeof DELETE_HOTEL_SUCCESS;
}

export interface DeleteHotelErrorAction {
  type: typeof DELETE_HOTEL_ERR;
  payload: string;
}

export interface UpdateHotelForEditAction {
  type: typeof UPDATE_HOTEL_FOR_EDIT;
  payload: HotelModel;
  callback: void;
}


export type HotelActionTypes =
  | FetchListHotelPagingAction
  | FetchListHotelPagingSuccessAction
  | FetchListHotelPagingErrorAction
  | FetchListHotelAllAction
  | FetchListHotelAllSuccessAction
  | FetchListHotelAllErrorAction
  | FetchDetailsHotelAction
  | FetchDetailsHotelSuccessAction
  | FetchDetailsHotelErrorAction
  | SaveHotelAction
  | SaveHotelSuccessAction
  | SaveHotelErrorAction
  | DeleteHotelAction
  | DeleteHotelSuccessAction
  | DeleteHotelErrorAction
  | UpdateHotelForEditAction;

